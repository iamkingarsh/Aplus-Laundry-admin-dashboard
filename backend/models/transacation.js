import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    payment_id: { type: String, required: true },
    entity: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    razorpay_order_id: { type: String, required: true },
    method: { type: String, required: true },
    captured: { type: Boolean, required: true },
    card_id: { type: String },
    bank: { type: String },
    wallet: { type: String },
    vpa: { type: String, required: true },
    fee: { type: Number, required: true },
    tax: { type: Number, required: true },
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

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
