import Product from "../models/product.js";


export const addOrUpdateProduct = async (req, res) => {
    try {
      const { id, productname, category, priceperpair, status } = req.body;
  
      // If an ID is provided, update the existing product
      if (id) {
        const existingProduct = await Product.findById(id);
  
        if (!existingProduct) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
  
        // Validate that productname is provided for updates
        if (!productname) {
          return res.status(400).json({ success: false, error: 'Product name is required for updates' });
        }
  
        // Update the existing product
        existingProduct.productname = productname;
        existingProduct.category = category || existingProduct.category;
        existingProduct.priceperpair = priceperpair || existingProduct.priceperpair;
        existingProduct.status = 'active';
  
        await existingProduct.save();
  
        return res.status(200).json({ success: true, data: existingProduct });
      }
  
      // If no ID is provided, check if the product name already exists
      const existingProductByName = await Product.findOne({ productname: productname });
  
      if (existingProductByName) {
        return res.status(400).json({ success: false, error: 'Product with this name already exists' });
      }
  
      // Create a new product
      const newProduct = new Product({
        productname: productname,
        category: category,
        priceperpair: priceperpair,
        status: 'active',
      });
  
      await newProduct.save();
  
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
  



  // Update product status by ID
export const updateProductStatus = async (req, res) => {
    try {
      const { id, status } = req.body;
  
      // Check if the ID exists in the products collection
      const existingProduct = await Product.findById(id);
  
      if (!existingProduct) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }
  
      // Update the status of the existing product
      existingProduct.status = status;
  
      await existingProduct.save();
  
      return res.status(200).json({ success: true, data: existingProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };

  
  // Delete product  by ID

  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.body;
  

      const existingProduct = await Product.findById(id);
  
      if (!existingProduct) {
        return res.status(404).json({ success: false, error: 'Product not found' });
      }

      await existingProduct.delete();
  
      res.status(200).json({ success: true, data: existingProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };