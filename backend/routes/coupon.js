import express from 'express';

import {
  createOrUpdateCoupon,
  getAllCoupons,
  getCouponById,
  deleteCouponById,
  updateCouponActiveStatusById,
} from '../controllers/coupon.js';
import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';

const couponRouter = express.Router();

// Add or update a coupon
couponRouter.post('/addorupdate', adminAuthenticateToken, createOrUpdateCoupon);

// Get all coupons
couponRouter.get('/all', authenticateToken, getAllCoupons);

// Get a specific coupon by its ID
couponRouter.get('/id/:id', adminAuthenticateToken, getCouponById);

// Delete a coupon by its ID
couponRouter.delete('/id/:id', adminAuthenticateToken, deleteCouponById);

// Update the active status of a coupon by its ID
couponRouter.put('/id/:id/activate', adminAuthenticateToken, updateCouponActiveStatusById);

export default couponRouter;
