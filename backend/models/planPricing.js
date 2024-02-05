import mongoose from 'mongoose';

const PlanPricingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  below12: {
    status: {
      type: Boolean,
    },
    amount: {
      type: Number,
    },
  },
  above12: {
    status: {
      type: Boolean,
    },
    amount: {
      type: Number,
    },
  },
  currency: {
    type: String,
    default: 'INR', // Default value for currency
    required: [true, 'Currency is required'],
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', // Reference to the Service collection
    required: [true, 'Service is required'],
  },
  periodPlan: {
    type: Number,
  },
});

const PlanPricing = mongoose.model('PlanPricing', PlanPricingSchema);

export default PlanPricing;
