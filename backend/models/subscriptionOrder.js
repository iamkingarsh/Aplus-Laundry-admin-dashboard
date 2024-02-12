import mongoose from 'mongoose';

const subscriptionOrderSchema = new mongoose.Schema({
  subscription_order_id: {
    type: String,
    // required: [true, 'Please enter an order id'],
    minlength: [1, 'Please enter an order id'],
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
  delivery_agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User collection for delivery_agent
  },  
  pickupDetails: {
    pickupDate: Date,
    pickupTime: String,
  }, 
  subscription_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription', // Reference to the Subscription collection
  },
}, {
  timestamps: true,
});

const SubscriptionOrder = mongoose.model('SubscriptionOrder', subscriptionOrderSchema);

export default SubscriptionOrder;
