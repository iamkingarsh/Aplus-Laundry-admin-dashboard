import express from 'express';
 
import  {
    createOrUpdateCoupon,
    getAllCoupons,
    getCouponById,
    deleteCouponById,
    updateCouponActiveStatusById,
  }  from '../controllers/coupon.js';
import { authenticateToken } from '../middleware/authToken.js';

const couponRouter = express.Router();

// Add or update a coupon
couponRouter.post('/addorupdate', authenticateToken, createOrUpdateCoupon);

// Get all coupons
couponRouter.get('/all', authenticateToken, getAllCoupons);

// Get a specific coupon by its ID
couponRouter.get('/:id', authenticateToken, getCouponById);

// Delete a coupon by its ID
couponRouter.delete('/:id', authenticateToken, deleteCouponById);

// Update the active status of a coupon by its ID
couponRouter.put('/:id/activate', authenticateToken, updateCouponActiveStatusById);

export default couponRouter;
