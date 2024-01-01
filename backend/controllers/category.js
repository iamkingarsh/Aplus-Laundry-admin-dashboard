import Category from "../models/category.js";

// Create or update a category
export const createOrUpdateCategory = async (req, res) => {
  try {
    const { title, id } = req.body;

    // Check if the title is provided
    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    const existingCategory = await Category.findOne({ title });

    if (existingCategory) {
      if (id) {
        const updatedCategory = await Category.findByIdAndUpdate(id, { title }, { new: true });
        return res.json({ success: true, data: updatedCategory });
      } else {
        return res.status(400).json({ success: false, error: 'Category already exists' });
      }
    }

    if (!id) {
      const newCategory = new Category({ title });
      await newCategory.save();
      return res.status(201).json({ success: true, data: newCategory });
    }

    return res.status(404).json({ success: false, error: 'Category not found' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ success: false, error: 'Category ID is required' });
      }
  
      const deletedCategory = await Category.findByIdAndDelete(id);
  
      if (deletedCategory) {
        return res.json({ success: true, data: deletedCategory });
      }
  
      return res.status(404).json({ success: false, error: 'Category not found' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };