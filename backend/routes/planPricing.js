import express from 'express';
import { createOrUpdatePlanPricing, deleteMultiplePlanPricingByIds, deletePlanPricingById, getAllPlanPricingPopulated, getPlanPricingById } from '../controllers/planPricing.js';
import { fetchSubscribers } from '../controllers/razorpaySubscriptions.js';
// import { createOrUpdatePlanPricing, deleteMultiplePlanPricingByIds, deletePlanPricingById, getAllPlanPricingPopulated, getPlanPricingById } from '../controllers/planPricing.js';
// import { createOrUpdateBelow12, deleteBelow12ById, deleteMultipleBelow12ByIds, getAllBelow12Populated, getBelow12ById } from '../controllers/below12.js';

const router = express.Router();

// Create or Update Below12
router.post('/add', createOrUpdatePlanPricing);

// Delete Below12 by ID
router.delete('/:id', deletePlanPricingById);

// Delete multiple Below12 by IDs
router.delete('/delete-multiple', deleteMultiplePlanPricingByIds);

// Get all Below12 (populated with service)
router.get('/getall', getAllPlanPricingPopulated);

// Get Below12 by ID (populated with service)
router.get('/:id', getPlanPricingById);


router.post('/fetch', fetchSubscribers);

export default router;
