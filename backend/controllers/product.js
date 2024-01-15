import Product from "../models/product.js";

export const createOrUpdateProduct = async (req, res) => {
    try {
        const {
            id,
            product_name,
            category,
            status,
            priceperpair
        } = req.body;

        const existingProduct = await Product.findById(id);

        if (existingProduct) {
            existingProduct.product_name = product_name;
            existingProduct.category = category;
            existingProduct.status = status;
            existingProduct.priceperpair = priceperpair;

            await existingProduct.save();

            return res.status(200).json({
                message: 'Product updated successfully',
                product: existingProduct
            });
        } else {
            const newProduct = new Product({
                product_name,
                category,
                status,
                priceperpair
            });
            await newProduct.save();

            return res.status(201).json({
                message: 'Product created successfully',
                product: newProduct
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const getAllProductsWithCategories = async (req, res) => {
    try {
        const products = await Product.find().populate('category');

        return res.status(200).json({
            products,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const updateProductActiveStatus = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            active
        } = req.body;

        // Validate that the 'active' field is a boolean
        if (typeof active !== 'boolean') {
            return res.status(400).json({
                error: 'Invalid value for the active field',
                ok: false
            });
        }

        // Find the product by ID
        const product = await Product.findById(id);

        // Check if the product with the given ID exists
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
                ok: false
            });
        }

    
        //change status to false if active is false

        if (active === false) {
            product.active = true;
        } else {
            product.active = false;
        }

        // Save the updated product
        await product.save();

        return res.status(200).json({
            message: 'Product active status updated successfully',
            product,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};



export const deleteProductById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Product not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};