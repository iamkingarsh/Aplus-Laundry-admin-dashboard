import mongoose from 'mongoose';


const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  subscriptionTransaction_id: [{
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionTransaction'
  }], 
  period: {
    type: String,
    required: true
  },
  kids_qty: {
    type: Number,
    required: true
  },
  adult_qty: {
    type: Number,
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  razorpay_plan_id: {
    type: String,
    required: true
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;

