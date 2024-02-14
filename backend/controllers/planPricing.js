import mongoose from 'mongoose';
import PlanPricing from '../models/planPricing.js';
import Product from '../models/product.js';
import Category from '../models/category.js';

// Create or update a PlanPricing
export const createOrUpdatePlanPricing = async (req, res) => {
  try {
    const { id, name, below12, above12, currency, service, periodPlan } = req.body;

    if (id) {
      const updatedPlanPricing = await PlanPricing.findByIdAndUpdate(
        id,
        { name, below12, above12, currency, service, periodPlan },
        { new: true, runValidators: true }
      );

      if (!updatedPlanPricing) {
        return res.status(404).json({ success: false, message: 'PlanPricing not found' });
      }

      return res.status(200).json({ success: true, data: updatedPlanPricing });
    } else {
      const newPlanPricing = await PlanPricing.create({
        name,
        below12,
        above12,
        currency,
        service,
        periodPlan,
      });
      return res.status(201).json({ success: true, data: newPlanPricing });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a PlanPricing by ID
export const deletePlanPricingById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const deletedPlanPricing = await PlanPricing.findByIdAndDelete(id);

    if (!deletedPlanPricing) {
      return res.status(404).json({ success: false, message: 'PlanPricing not found' });
    }

    res.status(200).json({ success: true, message: 'PlanPricing deleted successfully', data: deletedPlanPricing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Get all PlanPricing entries with service populated
export const getAllPlanPricingPopulated = async (req, res) => {
  try {
    const planPricingList = await PlanPricing.find()
      .populate({
        path: 'service',
        populate: [
          {
            path: 'laundryPerPair.items',
            model: Product,
            populate: {
              path: 'category',
              model: Category,
            },
          },
          {
            path: 'laundryByKG.items',
            model: Product,
            populate: {
              path: 'category',
              model: Category,
            },
          },
        ],
      });

    res.status(200).json({ success: true, data: planPricingList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Get a PlanPricing by ID with service populated
export const getPlanPricingById = async (req, res) => {
  try {
    const { id } = req.params;

    const planPricingDetail = await PlanPricing.findById(id).populate('service');

    if (!planPricingDetail) {
      return res.status(404).json({ success: false, message: 'PlanPricing not found' });
    }

    res.status(200).json({ success: true, data: planPricingDetail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const deleteMultiplePlanPricingByIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ success: false, message: 'Invalid ID format in the request body' });
    }

    const deletedPlanPricing = await PlanPricing.deleteMany({ _id: { $in: ids } });

    if (deletedPlanPricing.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No matching documents found' });
    }

    res.status(200).json({ success: true, message: 'PlanPricing deleted successfully', deletedCount: deletedPlanPricing.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};