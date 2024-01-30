// transactionsRoute.js

import express from 'express';

import { adminAuthenticateToken } from '../middleware/authToken.js';
import { deleteTransactionById, getAllTransactions, getTransactionsById } from '../controllers/transaction.js';

const transactionRouter = express.Router();


// transactionRouter.post('/addorupdate', adminAuthenticateToken, );


transactionRouter.get('/getall', adminAuthenticateToken, getAllTransactions);


transactionRouter.get('/getbyid/:id', adminAuthenticateToken, getTransactionsById);


transactionRouter.delete('/delete/:id', adminAuthenticateToken, deleteTransactionById);
// transactionRouter.delete('/ids', authenticateToken, deleteServiceByIds);


export default transactionRouter;