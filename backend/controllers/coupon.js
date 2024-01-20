import Coupon from '../models/coupon.js';

// Add or update a coupon
export const createOrUpdateCoupon = async (req, res) => {
    try {
        const {
            id,
            discount_type,
            discount_value,
            discount_code,
            active,
            discount_expiry_date,
            discount_usage_limit,
            discount_minimum_purchase_amount 
        } = req.body;

        const existingCoupon = await Coupon.findById(id);

        if (existingCoupon) {
            existingCoupon.discount_type = discount_type;
            existingCoupon.discount_value = discount_value;
            existingCoupon.discount_code = discount_code;
            existingCoupon.active = active;
            existingCoupon.discount_expiry_date = discount_expiry_date;
            existingCoupon.discount_usage_limit = discount_usage_limit;
            existingCoupon.discount_minimum_purchase_amount = discount_minimum_purchase_amount;

            await existingCoupon.save();

            return res.status(200).json({
                message: 'Coupon updated successfully',
                coupon: existingCoupon
            });
        } else {
            const newCoupon = new Coupon({
                discount_type,
                discount_value,
                discount_code,
                active,
                discount_expiry_date,
                discount_usage_limit,
                discount_minimum_purchase_amount
            });
            await newCoupon.save();

            return res.status(201).json({
                message: 'Coupon created successfully',
                coupon: newCoupon
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        return res.status(200).json({
            coupons,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};

// Get a specific coupon by its ID
export const getCouponById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return res.status(404).json({
                message: 'Coupon not found',
                ok: false
            });
        }

        return res.status(200).json({
            coupon,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};

// Delete a coupon by its ID
export const deleteCouponById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const deletedCoupon = await Coupon.findByIdAndDelete(id);

        if (!deletedCoupon) {
            return res.status(404).json({
                message: 'Coupon not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Coupon deleted successfully',
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
            ok: false
        });
    }
};

// Update the active status of a coupon by its ID
export const updateCouponActiveStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;

        const existingCoupon = await Coupon.findByIdAndUpdate(
            id,
            { active },
            { new: true }
        );

        if (!existingCoupon) {
            return res.status(404).json({
                message: 'Coupon not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Coupon status updated successfully',
            coupon: existingCoupon
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};
