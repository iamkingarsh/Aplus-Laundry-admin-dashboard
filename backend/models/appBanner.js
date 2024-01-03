import mongoose from 'mongoose';

const appBannerSchema = new mongoose.Schema({
  banner_title: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: (value) => value.length >= 2,
      message: 'Banner title is required and must be at least 2 characters long',
    },
  },
  banner_description: {
    type: String,
    minlength: 2,
    validate: {
      validator: (value) => value.length >= 2,
      message: 'Banner description is optional, but if provided, must be at least 2 characters long',
    },
  },
  banner_image: {
    type: String,
    required: true,
    minlength: 2,
    validate: {
      validator: (value) => value.length >= 2,
      message: 'Banner image is required and must be at least 2 characters long',
    },
  },
});

const AppBanner = mongoose.model('AppBanner', appBannerSchema);

export default AppBanner;
