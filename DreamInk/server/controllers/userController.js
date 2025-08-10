import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import crypto from "crypto";

// Helper function to create a JWT with an expiration
const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '3d' });
};
 
const registerUser = async (req,res) =>
{
    try {

        const {name, email, password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({success: false, message: "Please provide all required fields."})
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User with this email already exists." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, email, password : hashedPassword
        }
        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = createToken(user._id);

        res.status(201).json({
            success: true,
            token,
            credits: user.creditBalance,
            user: { name: user.name, email: user.email }
        });
    }
    catch (error)
    {
      console.error("Registration error:", error);
      res.status(500).json({success:false, message: "An error occurred during registration."})
    }
}

const loginUser = async (req,res) =>{
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password." });
        }

        const user = await userModel.findOne({email});
        
        if (!user) {
            // Use a generic message to prevent email enumeration
            return res.status(401).json({success: false, message: "Invalid credentials."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({success: false, message: "Invalid credentials."});
        }

        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token,
            credits: user.creditBalance,
            user: { name: user.name, email: user.email }
        });
    }
    catch(error)
    {
       console.error("Login error:", error);
       res.status(500).json({success:false, message: "An error occurred during login."})
     
      
    }
}

const userCredits = async (req,res)=>{
    try{
        // Fix: Get userId from the request object set by the auth middleware
        const userId = req.userId;
        const user = await userModel.findById(userId);

        // Add a check to ensure the user was found
        if (!user) {
            return res.status(404).json({success: false, message: "User not found"});
        }

        // Explicitly check if creditBalance is a valid number, otherwise default to 0.
        // This is more robust than `|| 0` as it handles `null` and other non-numeric values correctly.
        const creditBalance = typeof user.creditBalance === 'number' ? user.creditBalance : 0;

        res.status(200).json({success: true, credits: creditBalance, user: {name: user.name, email: user.email}});
    }
    catch(error)
    {   
        console.error("Error fetching user credits:", error);
        res.status(500).json({success:false, message: "An error occurred while fetching user credits."})
    }
}

const razorpayInstance = new razorpay(
    {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    }
);

const paymentRazorpay = async (req,res)=>{
    try{
        const userId = req.userId; // Use userId from auth middleware for security
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ success: false, message: "Missing planId" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let credits, plan, amount;

        switch(planId)
        {
            case 'Basic':
                plan = 'Basic';
                credits = 100;
                amount = 10;
                break;
            case 'Advanced':
                plan = 'Advanced';
                credits = 500;
                amount = 50;
                break;
            case 'Business': // Fix: Corrected typo and logic
                plan = 'Business';
                credits = 5000;
                amount = 250;
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid plan specified" });
        } 

        const transactionalData = {
            userId, plan, amount, credits
        }
        const newTransaction = await transactionModel.create(transactionalData);
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        // Fix: Correct async/await usage and error handling
        const order = await razorpayInstance.orders.create(options);

        if (!order) {
            return res.status(500).json({ success: false, message: "Error creating Razorpay order" });
        }

        res.status(200).json({ success: true, order });
    }
    catch(error){
        console.log(error)
        res.status(500).json({ success: false, message: "An internal server error occurred." })
    }
}

const paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, receipt } = req.body;
        const userId = req.userId;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !receipt) {
            return res.status(400).json({ success: false, message: "Payment details are missing" });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Find the transaction using our internal receipt ID, not Razorpay's order ID
            const transaction = await transactionModel.findById(receipt);

            if (!transaction) {
                return res.status(404).json({ success: false, message: "Transaction not found." });
            }

            if (transaction.userId.toString() !== userId) {
                return res.status(403).json({ success: false, message: "Unauthorized access to transaction." });
            }

            await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: transaction.credits } });

            transaction.payment = true;
            await transaction.save();

            res.status(200).json({ success: true, message: "Payment successful and credits added." });
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed. Signature mismatch." });
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export {registerUser, loginUser, userCredits, paymentRazorpay, paymentVerification};