import Service from "../models/service.js";

export const createOrUpdateService = async (req, res) => {
    try {
        const {
            id,
            serviceTitle,
            laundryPerPair,
            laundryByKG
        } = req.body;

        // Check if the provided id exists in the Service collection
        const existingService = await Service.findById(id);

        if (existingService) {
            // If id exists, update the existing document
            existingService.serviceTitle = serviceTitle;
            existingService.laundryPerPair = laundryPerPair;
            existingService.laundryByKG = laundryByKG;

            await existingService.save();

            return res.status(200).json({
                message: 'Service updated successfully',
                service: existingService
            });
        } else {
            // If id does not exist, create a new document
            const newService = new Service({
                serviceTitle,
                laundryPerPair,
                laundryByKG
            });
            await newService.save();

            return res.status(201).json({
                message: 'Service created successfully',
                service: newService
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};

export const getAllServicesWithItems = async (req, res) => {
    try {
        const services = await Service.find().populate({
            path: 'laundryPerPair.items laundryByKG.items',
            model: 'Product',
        });

        return res.status(200).json({
            services,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const getServiceByIdWithItems = async (req, res) => {
    try {
        const {
            serviceId
        } = req.params;

        const service = await Service.findById(serviceId).populate({
            path: 'laundryPerPair.items laundryByKG.items',
            model: 'Product',
        });

        if (!service) {
            return res.status(404).json({
                message: 'Service not found',
                ok: false
            });
        }

        return res.status(200).json({
            service,
            ok: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
};


export const deleteServiceById = async (req, res) => {
    try {
        const {
            serviceId
        } = req.params;

        const deletedService = await Service.findByIdAndDelete(serviceId);

        if (!deletedService) {
            return res.status(404).json({
                message: 'Service not found',
                ok: false
            });
        }

        return res.status(200).json({
            message: 'Service deleted successfully',
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