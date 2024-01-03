import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => value.length >= 3,
      message: 'Product name must be at least 3 characters long',
    },
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => value.length >= 3,
      message: 'Category must be at least 3 characters long',
    },
  },
  priceperpair: {
    type: String,
    required: true,
    validate: {
      validator: (value) => parseFloat(value) >= 1,
      message: 'Price per pair must be at least Rs. 1',
    },
  },
  
});

const Product = mongoose.model('Product', productSchema);

export default Product;
