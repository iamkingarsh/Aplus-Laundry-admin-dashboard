import express from 'express';
 
 
import { authenticateToken } from '../middleware/authToken.js';
import { createOrUpdateOrder, deleteOrderById, getAllOrders, getOrderById, updateOrderStatusById }  from '../controllers/order.js';


const orderRouter = express.Router();

orderRouter.post('/addorupdate', authenticateToken, createOrUpdateOrder);
orderRouter.get('/getall', authenticateToken, getAllOrders);
orderRouter.get('/:id', authenticateToken, getOrderById);
orderRouter.put('/:id/status', authenticateToken, updateOrderStatusById);
orderRouter.delete('/:id', authenticateToken, deleteOrderById); 

export default orderRouter;
