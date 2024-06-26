import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    payment_id: { type: String },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
      },
    razorpay_signature: { type: String,  },
    entity: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String,   },
    status: { type: String, required: true },
    razorpay_order_id: { type: String, },
    method: { type: String, required: true },
    captured: { type: Boolean,   },
    card_id: { type: String },
    bank: { type: String },
    wallet: { type: String },
    vpa: { type: String,   },
    fee: { type: Number,   },
    tax: { type: Number,   },
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
