import express from 'express';
import { createOrUpdateBelow12, deleteBelow12ById, deleteMultipleBelow12ByIds, getAllBelow12Populated, getBelow12ById } from '../controllers/below12.js';
// import { createOrUpdateBelow12, deleteBelow12ById, deleteMultipleBelow12ByIds, getAllBelow12Populated, getBelow12ById } from '../controllers/below12.js';

const router = express.Router();

// Create or Update Below12
router.post('/add', createOrUpdateBelow12);

// Delete Below12 by ID
router.delete('/:id', deleteBelow12ById);

// Delete multiple Below12 by IDs
router.delete('/delete-multiple', deleteMultipleBelow12ByIds);

// Get all Below12 (populated with service)
router.get('/getall', getAllBelow12Populated);

// Get Below12 by ID (populated with service)
router.get('/:id', getBelow12ById);

export default router;
