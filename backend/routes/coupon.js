import express from 'express';
 
import  {
    createOrUpdateCoupon,
    getAllCoupons,
    getCouponById,
    deleteCouponById,
    updateCouponActiveStatusById,
  }  from '../controllers/coupon.js';
import { adminAuthenticateToken } from '../middleware/authToken.js';

const couponRouter = express.Router();

// Add or update a coupon
couponRouter.post('/addorupdate', adminAuthenticateToken, createOrUpdateCoupon);

// Get all coupons
couponRouter.get('/all', adminAuthenticateToken, getAllCoupons);

// Get a specific coupon by its ID
couponRouter.get('/:id', adminAuthenticateToken, getCouponById);

// Delete a coupon by its ID
couponRouter.delete('/:id', adminAuthenticateToken, deleteCouponById);

// Update the active status of a coupon by its ID
couponRouter.put('/:id/activate', adminAuthenticateToken, updateCouponActiveStatusById);

export default couponRouter;
