import mongoose from "mongoose";
import Below12 from "../models/below12.js";

// Create or Update Below12
export const createOrUpdateBelow12 = async (req, res) => {
  try {
    const { id, name, amount, currency, service } = req.body;

    if (id) {
      const updatedBelow12 = await Below12.findByIdAndUpdate(
        id,
        { name, amount, currency, service },
        { new: true, runValidators: true }
      );

      if (!updatedBelow12) {
        return res.status(404).json({ success: false, message: 'Below12 not found' });
      }

      return res.status(200).json({ success: true, data: updatedBelow12 });
    } else {
      const newBelow12 = await Below12.create({ name, amount, currency, service });
      return res.status(201).json({ success: true, data: newBelow12 });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};




export const deleteBelow12ById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    const deletedBelow12 = await Below12.findByIdAndDelete(id);

    if (!deletedBelow12) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.status(200).json({ success: true, message: 'Document deleted successfully', data: deletedBelow12 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export const deleteMultipleBelow12ByIds = async (req, res) => {
    try {
      const { ids } = req.body;
  
      if (!ids.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ success: false, message: 'Invalid ID format in the request body' });
      }
  
      const deletedBelow12 = await Below12.deleteMany({ _id: { $in: ids } });
  
      if (deletedBelow12.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'No matching documents found' });
      }
  
      res.status(200).json({ success: true, message: 'Documents deleted successfully', deletedCount: deletedBelow12.deletedCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };


  export const getAllBelow12Populated = async (req, res) => {
    try {
      const below12List = await Below12.find().populate('service');
      
      res.status(200).json({ success: true, data: below12List });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  



export const getBelow12ById = async (req, res) => {
  try {
    const { id } = req.params;

    const below12Detail = await Below12.findById(id).populate('service');

    if (!below12Detail) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.status(200).json({ success: true, data: below12Detail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

