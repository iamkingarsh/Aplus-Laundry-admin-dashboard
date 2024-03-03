 
// productController.js

  import {
        createOrUpdateProduct,
        getAllProductsWithCategories,
        updateProductActiveStatus,
        deleteProductById,
        deleteProductByIds,
      } from '../controllers/product.js';
import { authenticateToken } from '../middleware/authToken.js';
import express from 'express';
  const productRouter = express.Router();
  
  // Route for creating or updating a product
  productRouter.post('/adorupdate', authenticateToken, createOrUpdateProduct);
  
  // Route for getting all products with categories
  productRouter.get('/getall', getAllProductsWithCategories);
  productRouter.get('/getid/:id', getAllProductsWithCategories);

  
  // Route for updating the active status of a product
  productRouter.put('/id/:id/active', authenticateToken, updateProductActiveStatus);
  
  // Route for deleting a product by ID    
  productRouter.delete('/id/:id', authenticateToken, deleteProductById);
  productRouter.delete('/ids', authenticateToken, deleteProductByIds);

  
  export default productRouter;
  
 