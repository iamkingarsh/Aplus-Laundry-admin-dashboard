import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: [true, 'Product name is required'],
    minlength: [3, 'Product name must be at least 3 characters long'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    minlength: [3, 'Category must be at least 3 characters long'],
  },
  priceperpair: {
    type: String,
    required: [true, 'Price per pair is required'],
    validate: {
      validator: (value) => parseFloat(value) >= 1, 
      message: 'Price per pair must be at least Rs. 1',
    },
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active',
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
