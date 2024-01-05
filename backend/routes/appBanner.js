import express from 'express';  // Adjust the path based on your project structure
import { createOrUpdateAppBanner, deleteAppBannerById, getAllAppBanners, getAppBannerById } from '../controllers/appBanner.js';
import { adminAuthenticateToken } from '../middleware/authToken.js';

const appBannerRouter = express.Router();

// Create or update an app banner
appBannerRouter.post('/adorupdate', adminAuthenticateToken, createOrUpdateAppBanner);

// Get all app banners
appBannerRouter.get('/getall', adminAuthenticateToken, getAllAppBanners);

// Get a specific app banner by ID
appBannerRouter.get('/:id', adminAuthenticateToken, getAppBannerById);

// Delete an app banner by ID
appBannerRouter.delete('/:id', adminAuthenticateToken, deleteAppBannerById);

export default appBannerRouter;
