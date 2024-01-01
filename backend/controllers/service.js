import Service from "../models/service.js";

 

// Add or update a service
export const addOrUpdateService = async (req, res) => {
  try {
    const { id, title, laundryByKg, laundryPerPair } = req.body;

    // If an ID is provided, update the existing service
    if (id) {
      const existingService = await Service.findById(id);

      if (!existingService) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }

      // Update the existing service
      existingService.title = title || existingService.title;
      existingService.laundryByKg = {
        status: laundryByKg.status || existingService.laundryByKg.status,
        price: laundryByKg.price || existingService.laundryByKg.price,
        items: laundryByKg.items || existingService.laundryByKg.items,
      };
      existingService.laundryPerPair = {
        status: laundryPerPair.status || existingService.laundryPerPair.status,
        items: laundryPerPair.items || existingService.laundryPerPair.items,
      };

      await existingService.save();

      return res.status(200).json({ success: true, data: existingService });
    }

    // If no ID is provided, create a new service
    const newService = new Service({
      title,
      laundryByKg: {
        status: laundryByKg.status || 'Active',
        price: laundryByKg.price || 0,
        items: laundryByKg.items || [],
      },
      laundryPerPair: {
        status: laundryPerPair.status || 'Active',
        items: laundryPerPair.items || [],
      },
    });

    await newService.save();

    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get all services
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// Delete service by ID
export const deleteService = async (req, res) => {
    try {
      const { id } = req.body;
  
      const existingService = await Service.findById(id);
  
      if (!existingService) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
  
      await existingService.delete();
  
      res.status(200).json({ success: true, data: existingService });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
  

  // Update service status by ID
export const updateServiceStatus = async (req, res) => {
    try {
      const { id, laundryByKgStatus, laundryPerPairStatus } = req.body;
  
      const existingService = await Service.findById(id);
  
      if (!existingService) {
        return res.status(404).json({ success: false, error: 'Service not found' });
      }
  
      // Update the status based on the provided values
      if (laundryByKgStatus !== undefined) {
        existingService.laundryByKg.status = laundryByKgStatus;
      }
  
      if (laundryPerPairStatus !== undefined) {
        existingService.laundryPerPair.status = laundryPerPairStatus;
      }
  
      await existingService.save();
  
      return res.status(200).json({ success: true, data: existingService });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
  