import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => value.length >= 3,
      message: 'Category title must be at least 3 characters long',
    },
  },

});

const Category = mongoose.model('Category', categorySchema);

export default Category;
