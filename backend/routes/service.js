// serviceRoutes.js

import express from 'express';
 
import {
  createOrUpdateService,
    getAllServicesWithItems,
    getServiceByIdWithItems,
    deleteServiceById,
    deleteServiceByIds,
  } from '../controllers/service.js';
import { authenticateToken } from '../middleware/authToken.js';

const serviceRouter = express.Router();


serviceRouter.post('/addorupdate', authenticateToken, createOrUpdateService);


serviceRouter.get('/allwithitems', authenticateToken, getAllServicesWithItems);


serviceRouter.get('/id/:id/withitems', authenticateToken, getServiceByIdWithItems);


serviceRouter.delete('/id/:id', authenticateToken, deleteServiceById);
serviceRouter.delete('/ids', authenticateToken, deleteServiceByIds);


export default serviceRouter;