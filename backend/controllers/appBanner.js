import AppBanner from "../models/appBanner.js";

export const createOrUpdateAppBanner = async (req, res) => {
    try {
        const {
            id,
            banner_title,
            banner_description,
            banner_image
        } = req.body;

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