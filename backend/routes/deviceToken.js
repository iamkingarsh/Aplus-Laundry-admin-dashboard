import express from 'express'; 
import { addOrEditDeviceToken, deleteDeviceToken, getDeviceToken } from '../controllers/deviceToken.js';

const deviceTokenRouter = express.Router();

// Route to add or edit device token for a specific user
deviceTokenRouter.put('/:userId', addOrEditDeviceToken);

// Route to get device token for a specific user
deviceTokenRouter.get(' /:userId ', getDeviceToken);

// Route to delete device token for a specific user
deviceTokenRouter.delete('/:userId ', deleteDeviceToken);

export default deviceTokenRouter;
