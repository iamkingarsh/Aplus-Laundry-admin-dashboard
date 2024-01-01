import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
  },
  laundryByKg: {
    status: {
      type: String,
      enum: ['Active', 'Deactivated'],
      default: 'Active',
    },
    price: {
      type: Number,
      default: 0,
    },
    items: {
      type: [String],
      default: [],
    },
  },
  laundryPerPair: {
    status: {
      type: String,
      enum: ['Active', 'Deactivated'],
      default: 'Active',
    },
    items: {
      type: [String],
      default: [],
    },
  },
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
