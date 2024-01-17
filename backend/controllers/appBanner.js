import AppBanner from "../models/appBanner.js";
import mongoose from 'mongoose';


export const createOrUpdateAppBanner = async (req, res) => {
    try {
        const {
            id,
            banner_title,
            banner_description,
            banner_image
        } = req.body;
console.log('req.body',req.body)
        const existingAppBanner = await AppBanner.findById(id);

        if (existingAppBanner) {
            existingAppBanner.banner_title = banner_title;
            existingAppBanner.banner_description = banner_description;
            existingAppBanner.banner_image = banner_image;

            await existingAppBanner.save();

            return res.status(200).json({
                message: 'AppBanner updated successfully',
                appBanner: existingAppBanner
            });
        } else {
            const newAppBanner = new AppBanner({
                banner_title,
                banner_description,
                banner_image
            });
            await newAppBanner.save();

            return res.status(201).json({
                message: 'AppBanner created successfully',
                appBanner: newAppBanner
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const getAllAppBanners = async (req, res) => {
    try {
        const appBanners = await AppBanner.find();
        return res.status(200).json({
            appBanners,
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


export const getAppBannerById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const appBanner = await AppBanner.findById(id);

        if (!appBanner) {
            return res.status(404).json({
                message: 'AppBanner not found',
                ok: false
            });
        }

        return res.status(200).json({
            appBanner,
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

export const deleteAppBannerById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and remove the app banner by ID
      const deletedAppBanner = await AppBanner.findOneAndDelete({ _id: id });
  
      if (!deletedAppBanner) {
        return res.status(404).json({ message: 'AppBanner not found', ok: false });
      }
  
      return res.status(200).json({ message: 'AppBanner deleted successfully', ok: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error', ok: false });
    }
  };

  export const deleteAppBannerByIds = async (req, res) => {
    console.log(req.body)
    try {
        const appBannerIds  = req.body;

        if (!appBannerIds || !Array.isArray(appBannerIds) || appBannerIds.length === 0) {
            return res.status(400).json({
                message: 'Invalid appBanner IDs provided 1',
                ok: false,
            });
        }

        // Validate each appBanner ID
        if (!appBannerIds.every(mongoose.Types.ObjectId.isValid)) {
            return res.status(400).json({
                message: 'Invalid appBanner IDs provided',
                ok: false,
            });
        }

        // Delete categories by their IDs
        const deletionResult = await AppBanner.deleteMany({ _id: { $in: appBannerIds } });

        if (deletionResult.deletedCount > 0) {
            return res.status(200).json({
                message: 'Categories deleted successfully',
                ok: true,
            });
        } else {
            return res.status(404).json({
                message: 'No categories found for deletion',
                ok: false,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
};