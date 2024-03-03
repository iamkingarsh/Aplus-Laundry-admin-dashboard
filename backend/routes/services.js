import express from 'express';
import {
  addOrUpdateService,
  getServices,
  deleteService,
  updateServiceStatus,
} from '../controllers/service.js';

const router = express.Router();

// Add or update a service
router.post('/add', addOrUpdateService);

// Get all services
router.get('/all', getServices);

// Delete service by ID
router.delete('/delete', deleteService);

// Update service status by ID
router.patch('/update/status', updateServiceStatus);

export default router;
