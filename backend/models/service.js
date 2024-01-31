import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceTitle: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => value.length >= 3,
      message: 'Service title must be at least 3 characters long',
    },
  },
  laundryPerPair: {
    active: {
      type: Boolean,
      default: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  laundryByKG: {
    active: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
      required: function () {
        return this.laundryByKG.active;
      },
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
      },
    ],
  },
  isSubscriptionService: {
    type: Boolean,
    required: true,

  },
  // arrayOfrazorpaySubscriptionPlans: [
  //   {
  //     type: array,
  //     required: function () {
  //       return this.isSubscriptionService;
  //   },
  // ],
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;
