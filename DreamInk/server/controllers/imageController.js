import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";



export const generateImage = async (req,res)=>{
   try{
    const userId = req.userId; // Get userId from auth middleware
    const { prompt } = req.body;

    if (!prompt)
    {
        return res.status(400).json({success: false, message: "Prompt is required."});
    }

    const user = await userModel.findById(userId);
    if (!user)
    {
        return res.status(404).json({success: false, message: "User not found."});
    }

    // Atomically find a user with credits > 0 and decrement their balance.
    const updatedUser = await userModel.findOneAndUpdate(
        { _id: userId, creditBalance: { $gt: 0 } },
        { $inc: { creditBalance: -1 } },
        { new: true }
    );

    if (!updatedUser) {
        // If no user was updated, it means their credit balance was 0 or less.
        return res.status(402).json({ success: false, message: "Insufficient Credits", creditBalance: user.creditBalance || 0 });
    }

    // Try to generate the image. If it fails, refund the credit.
    try {
        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1',formData,
            {
                headers:{
                    'x-api-key': process.env.CLIPDROP_API,
                    ...formData.getHeaders()
                },
                responseType: 'arraybuffer'
            }
        )
        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:image/png;base64,${base64Image}`;

        res.status(200).json({success: true, message: "Image Generated", creditBalance: updatedUser.creditBalance, image: resultImage});
    } catch (apiError) {
        // Refund the credit if the API call fails
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: 1 } });
        console.error("Image generation API error:", apiError.response ? apiError.response.data.toString() : apiError.message);
        res.status(500).json({success: false, message: "Image generation failed. Your credit has been refunded."});
    }
   }
   catch(error){
        console.error("An unexpected server error occurred during image generation:", error);
        res.status(500).json({success: false, message: "An internal server error occurred. Please try again later."})
   }
}