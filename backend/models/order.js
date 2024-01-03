import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
    type: String,
    required: true,
    minlength: 1,
    validate: {
      validator: (value) => value.length >= 1,
      message: 'Please select a service',
    },
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  customer: {
    type: String,
    required: true,
    minlength: 1,
    validate: {
      validator: (value) => value.length >= 1,
      message: 'Please select a customer',
    },
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
    type: String,
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
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
