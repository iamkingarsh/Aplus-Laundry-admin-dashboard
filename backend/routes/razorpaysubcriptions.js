// transactionsRoute.js

import express from 'express';

import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
import { deleteTransactionById, getAllTransactions, getTransactionsById } from '../controllers/transaction.js';
import { getAllPlans } from '../controllers/razorpaySubscriptions.js';

const razorpaySubcriptionRouter = express.Router();


// razorpaySubcriptionRouter.post('/addorupdate', adminAuthenticateToken, );


razorpaySubcriptionRouter.post('/createNewPlan', adminAuthenticateToken, getAllTransactions);


razorpaySubcriptionRouter.get('/getallPlans', authenticateToken, getAllPlans);

razorpaySubcriptionRouter.get('/getPlanById/:id', authenticateToken, getTransactionsById);


razorpaySubcriptionRouter.delete('/delete/:id', adminAuthenticateToken, deleteTransactionById);
// razorpaySubcriptionRouter.delete('/ids', authenticateToken, deleteServiceByIds);


export default razorpaySubcriptionRouter;