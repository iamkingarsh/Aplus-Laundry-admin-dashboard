import Category from "../models/category.js";

export const createOrUpdateCategory = async (req, res) => {
    try {
        const {
            id,
            title
        } = req.body;

        const existingCategory = await Category.findById(id);

        if (existingCategory) {
            existingCategory.title = title;
            await existingCategory.save();
            return res.status(200).json({
                message: 'Category updated successfully',
                category: existingCategory
            });
        } else {
            const newCategory = new Category({
                title
            });
            await newCategory.save();
            return res.status(201).json({
                message: 'Category created successfully',
                category: newCategory
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const {
            categoryId
        } = req.params;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
                ok: false
            });
        }

        return res.status(200).json({
            category,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        return res.status(200).json({
            categories,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const deleteCategoryById = async (req, res) => {
    try {
        const {
            categoryId
        } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                message: 'Category not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Category deleted successfully',
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
