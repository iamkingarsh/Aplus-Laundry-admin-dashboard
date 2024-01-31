import express from 'express';


import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
import { createOrUpdateOrder, deleteOrderById, getAllOrders, getOrderById, savePayment, updateOrderStatusById } from '../controllers/order.js';


const orderRouter = express.Router();

orderRouter.post('/addorupdate', authenticateToken, createOrUpdateOrder);
orderRouter.post('/save', authenticateToken, savePayment);

orderRouter.get('/getall', authenticateToken, getAllOrders);
orderRouter.get('/:id', authenticateToken, getOrderById);
orderRouter.put('/:id/status', authenticateToken, updateOrderStatusById);
orderRouter.delete('/:id', authenticateToken, deleteOrderById);

// orderRouter.post('/createPlan', authenticateToken, createPlan);
// orderRouter.post('/subscribeToPlans', authenticateToken, subscribeToPlans);

export default orderRouter;
