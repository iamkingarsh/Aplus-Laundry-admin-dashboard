import express from 'express';  // Adjust the path based on your project structure
import { createOrUpdateAppBanner, deleteAppBannerById, getAllAppBanners, getAppBannerById } from '../controllers/appBanner.js';
import { authenticateToken } from '../middleware/authToken.js';

const appBannerRouter = express.Router();

// Create or update an app banner
appBannerRouter.post('/adorupdate', authenticateToken, createOrUpdateAppBanner);

// Get all app banners
appBannerRouter.get('/getall', authenticateToken, getAllAppBanners);

// Get a specific app banner by ID
appBannerRouter.get('/:id', authenticateToken, getAppBannerById);

// Delete an app banner by ID
appBannerRouter.delete('/:id', authenticateToken, deleteAppBannerById);

export default appBannerRouter;
