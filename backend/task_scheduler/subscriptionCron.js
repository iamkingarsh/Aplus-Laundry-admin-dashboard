// subscriptionCron.js

import cron from 'node-cron';
import User from "../models/user.js";

const checkSubscription = cron.schedule('* * * * * *', async () => { // Update the schedule to run every second

    try {
        const usersToUpdate = await User.find({
            customerType: 'subscriber',
            subscriptionEndDate: { $lte: new Date() } 
        });

        await Promise.all(usersToUpdate.map(async (user) => {
            user.customerType = 'nonsubscriber';
            await user.save();
        }));

        // console.log('Customer types updated successfully.');
    } catch (error) {
        console.error('Error updating customer types:', error);
    }
});

export default checkSubscription;
