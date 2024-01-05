import express from 'express';
 
 // Adjust the path based on your project structure
import { authenticateToken } from '../middleware/authToken.js';
import {
  createOrUpdateCategory,
  getCategoryById,
  getAllCategories,
  deleteCategoryById,
} from '../controllers/category.js';

const categoryRouter = express.Router();

// Route: /category/createorupdate
categoryRouter.post('/createorupdate', authenticateToken, createOrUpdateCategory);

// Route: /category/:categoryId
categoryRouter.get('/:categoryId', authenticateToken, getCategoryById);

// Route: /category/all
categoryRouter.get('/all', authenticateToken, getAllCategories);

// Route: /category/:categoryId
categoryRouter.delete('/:categoryId', authenticateToken, deleteCategoryById);

export default categoryRouter;
