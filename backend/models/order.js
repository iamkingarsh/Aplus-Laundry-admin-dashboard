import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: [true, 'Please enter an order id'],
    minlength: [1, 'Please enter an order id'],
  },
  order_type: {
    type: String,
    required: [true, 'Please select an order type'],
    minlength: [1, 'Please select an order type'],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service collection
    required: [true, 'Service is required'],
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product collection
      },
      quantity: {
        type: Number,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: [true, 'Customer is required'],
  },
  status: {
    type: String,
    required: [true, 'Please select a status'],
    minlength: [1, 'Please select a status'],
  },
  payment: {
    type: String,
  },
  delivery_agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection for delivery_agent
  },
  cart: {
    total: {
      type: Number,
    },
    weight: {
      value: {
        type: Number,
      },
      unit: {
        type: String,
      },
    },
  },
  orderDate: {
    type: Date,
    default: new Date(),
  },
  pickupDetails: {
    pickupDate: Date,
    pickupTime: String,
  }, transaction_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction', // Reference to the User collection for transaction_id
  },
  coupon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon', // Reference to the Coupon collection
  },
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User.address', // Reference to the specific address in the user's address array
  },
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
