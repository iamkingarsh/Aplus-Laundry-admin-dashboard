import mongoose from 'mongoose';

const below12Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
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
});

const Below12 = mongoose.model('Below12', below12Schema);

export default Below12;
