import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  discount_type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  discount_value: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: (value) => value.length >= 2,
      message: 'Discount value is required',
    },
  },
  discount_code: {
    type: String,
    required: true,
    uppercase: true,
    minlength: 2,
    validate: {
      validator: (value) => value.length >= 2,
      message: 'Discount code is required',
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
  discount_expiry_date: {
    type: Date,
    required: true,
  },
  discount_usage_limit: {
    type: String,
  },
  discount_minimum_purchase_amount: {
    type: String,
  },
});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
