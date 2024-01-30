import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
    minlength: 1,
    validate: {
      validator: (value) => value.length >= 1,
      message: 'Please enter an order id',
    },
  },
  order_type: {
    type: String,
    required: true,
    minlength: 1,
    validate: {
      validator: (value) => value.length >= 1,
      message: 'Please select an order type',
    },
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service collection
    required: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product collection
        // required: true,
      },
      quantity: {
        type: Number,
        // required: true,
      },
    },
  ],
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection
    required: true,
  },
  status: {
    type: String,
    required: true,
    minlength: 1,
    validate: {
      validator: (value) => value.length >= 1,
      message: 'Please select a status',
    },
  },
  payment: {
    type: String,
  },
  delivery_agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection for delivery_agent
  },
  cartTotal: {
    type: Number,
  },
  cartWeight: {
    type: Number,
  },
  cartWeightBy: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  pickupDetails: {
    type: Object,
  },
  // transaction: {
  //   id: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Transaction', 
  //     // required: true,
  //   },
  // },
}, {
  timestamps: true,

});

const Order = mongoose.model('Order', orderSchema);

export default Order;
