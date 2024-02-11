import mongoose, { Schema } from 'mongoose';

const subscriptionTransactionSchema = new mongoose.Schema({
    payment_id: { type: String },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User collection
    },

    razorpay_signature: { type: String },

    entity: { type: String },
    amount: { type: Number },
    currency: { type: String },
    status: { type: String },
    razorpay_plan_id: { type: String },
    method: { type: String },
    captured: { type: Boolean },
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
