import express from 'express';  // Adjust the path based on your project structure
import { createOrUpdateAppBanner, deleteAppBannerById, deleteAppBannerByIds, getAllAppBanners, getAppBannerById } from '../controllers/appBanner.js';
import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';

const appBannerRouter = express.Router();

// Create or update an app banner
appBannerRouter.post('/addorupdate', adminAuthenticateToken, createOrUpdateAppBanner);

// Get all app banners
appBannerRouter.get('/getall', authenticateToken, getAllAppBanners);

// Get a specific app banner by ID
appBannerRouter.get('/id/:id', authenticateToken, getAppBannerById);

// Delete an app banner by ID
appBannerRouter.delete('/id/:id', adminAuthenticateToken, deleteAppBannerById);   


appBannerRouter.delete('/ids', adminAuthenticateToken, deleteAppBannerByIds);
export default appBannerRouter;
