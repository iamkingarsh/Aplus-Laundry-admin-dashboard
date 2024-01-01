import express from 'express';
import { addOrUpdateProduct , updateProductStatus ,deleteProduct} from '../controllers/product.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();

// Create or Update product
router.post('/create-or-update', addOrUpdateProduct);

// Update product status by ID
router.put('/update/status', updateProductStatus);

// Delete product by ID
router.delete('/delete', deleteProduct);

export default router