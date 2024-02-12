import express from 'express';
import { deleteTransactionById, getAllSubscriptionOrders, getAllTransactions, getSubscriptionOrderById, getSubscriptionOrdersByCustomerId, getTransactionById, getTransactionsByUserId } from '../controllers/subscriptionTransaction.js';
 

const subscriptionTransactionRouter = express.Router();

// Transaction routes
subscriptionTransactionRouter.get('/transactions', getAllTransactions);
subscriptionTransactionRouter.get('/transactions/:id', getTransactionById);
subscriptionTransactionRouter.get('/transactions/user/:userId', getTransactionsByUserId);
subscriptionTransactionRouter.delete('/transactions/:id', deleteTransactionById);

// Subscription order routes
subscriptionTransactionRouter.get('/orders', getAllSubscriptionOrders);
subscriptionTransactionRouter.get('/orders/:id', getSubscriptionOrderById);
subscriptionTransactionRouter.get('/orders/user/:userId', getSubscriptionOrdersByCustomerId);

export default subscriptionTransactionRouter;
