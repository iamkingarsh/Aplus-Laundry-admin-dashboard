import express from 'express';
 
 // Adjust the path based on your project structure
import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
import {
  createOrUpdateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategoryById,
  deleteCategoriesByIds
} from '../controllers/category.js';

const categoryRouter = express.Router();

// Route: /category/createorupdate
categoryRouter.post('/createorupdate', adminAuthenticateToken, createOrUpdateCategory);

// Route: /category/all
categoryRouter.get('/all', authenticateToken, getAllCategories);

// Route: /category/:categoryId
categoryRouter.get('/id/:categoryId', authenticateToken, getCategoryById);

// Route: /category/:categoryId
categoryRouter.delete('/id/:categoryId', adminAuthenticateToken, deleteCategoryById);

categoryRouter.delete('/ids', adminAuthenticateToken, deleteCategoriesByIds);


export default categoryRouter;
