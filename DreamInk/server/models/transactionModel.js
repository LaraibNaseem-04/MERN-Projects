import mongoose  from "mongoose";

const transactionSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId, // Improvement: Use ObjectId for relation
    ref: 'users',                         // Improvement: Reference the user model
    required: true,
   },
   plan: {
    type: String, 
    required: true
   },
   amount:{
    type: Number,
    required: true
   },
   credits:{
    type: Number,
    required: true
   },
   payment: {
    type: Boolean,
    default: false
   },
   date:{
    type: Date,      // Improvement: Use Date type
    default: Date.now // Improvement: Set default value
   }

})

const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema);


export default transactionModel;