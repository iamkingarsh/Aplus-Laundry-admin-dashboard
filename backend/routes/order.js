import express from 'express';


import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
import { createOrUpdateOrder, deleteOrderById, getAllOrders, getOrderById, getUserOrders, savePayment, updateOrderStatusById } from '../controllers/order.js';


const orderRouter = express.Router();

orderRouter.post('/addorupdate', authenticateToken, createOrUpdateOrder);
orderRouter.post('/save', authenticateToken, savePayment);

orderRouter.get('/getall', authenticateToken, getAllOrders);
orderRouter.get('/:id', authenticateToken, getOrderById);
orderRouter.put('/:id/status', adminAuthenticateToken, updateOrderStatusById);
orderRouter.delete('/:id', adminAuthenticateToken, deleteOrderById);
orderRouter.get('/getuserorders/:userId', authenticateToken, getUserOrders);



export default orderRouter;
