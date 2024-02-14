import User from "../models/user.js";

// Controller to add or edit device token for a specific user
export const addOrEditDeviceToken = async (req, res) => {
    try {
        const { userId } = req.params;
        const { deviceToken } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.deviceToken = deviceToken;
        await user.save();

        return res.status(200).json({ success: true, message: 'Device token updated successfully' });
    } catch (error) {
        console.error('Error adding/editing device token:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Controller to get device token for a specific user
export const getDeviceToken = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        return res.status(200).json({ success: true, deviceToken: user.deviceToken });
    } catch (error) {
        console.error('Error getting device token:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Controller to delete device token for a specific user
export const deleteDeviceToken = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.deviceToken = undefined;
        await user.save();

        return res.status(200).json({ success: true, message: 'Device token deleted successfully' });
    } catch (error) {
        console.error('Error deleting device token:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
