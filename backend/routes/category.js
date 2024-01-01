import express from 'express';
import { createOrUpdateCategory , deleteCategory} from '../controllers/category.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
// Route to create or update a category
router.post('/create-or-update', createOrUpdateCategory);

// Route to delete a category by ID
router.delete('/delete', deleteCategory);

export default router