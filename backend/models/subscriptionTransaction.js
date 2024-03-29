import mongoose from 'mongoose';
const { Schema } = mongoose; // Import Schema from mongoose

const subscriptionTransactionSchema = new Schema({
    payment_id: { type: String, required: true },
// import mongoose, { Schema } from 'mongoose';

// const subscriptionTransactionSchema = new mongoose.Schema({
//     payment_id: { type: String },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
    },short_url:{ type: String, required: true },
   
    razorpay_signature: { type: String, required: true },           
    razorpay_subscription_id: { type: String, required: true },  
    entity: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    razorpay_plan_id: { type: String, required: true },
    method: { type: String, required: true },
    captured: { type: Boolean, required: true },
    card_id: { type: String },
    bank: { type: String },
    wallet: { type: String },
    vpa: { type: String },
    fee: { type: Number },
    tax: { type: Number },
    error_code: { type: String },
    error_description: { type: String },
    acquirer_data: {
        rrn: { type: String },
        upi_transaction_id: { type: String }
    },
    created_at: { type: Date, default: Date.now },
    upi: {
        vpa: { type: String }
    }
}, {
    timestamps: true
});

const SubscriptionTransaction = mongoose.model('SubscriptionTransaction', subscriptionTransactionSchema);

export default SubscriptionTransaction;
