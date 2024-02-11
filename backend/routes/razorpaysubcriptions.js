// transactionsRoute.js

import express from 'express';

import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
import { deleteTransactionById, getAllTransactions, getTransactionsById } from '../controllers/transaction.js';

import { createPlan, createSubscriptionCheckout, deletePlan, getAllPlans, saveSubscriptionPayment } from '../controllers/razorpaySubscriptions.js';


const razorpaySubcriptionRouter = express.Router();


// razorpaySubcriptionRouter.post('/addorupdate', adminAuthenticateToken, );


razorpaySubcriptionRouter.post('/createNewPlan', authenticateToken, createPlan);
razorpaySubcriptionRouter.get('/getallPlans', authenticateToken, getAllPlans);
razorpaySubcriptionRouter.get('/getPlanById/:id', authenticateToken, getTransactionsById);
razorpaySubcriptionRouter.post('/createSubscriptionCheckout', authenticateToken, createSubscriptionCheckout);
razorpaySubcriptionRouter.post('/subscriptionTransaction/save', authenticateToken, saveSubscriptionPayment);

razorpaySubcriptionRouter.delete('/delete/:id', adminAuthenticateToken, deleteTransactionById);
razorpaySubcriptionRouter.delete('/deletePlan/:id', adminAuthenticateToken, deletePlan);

// razorpaySubcriptionRouter.delete('/ids', authenticateToken, deleteServiceByIds);


export default razorpaySubcriptionRouter;