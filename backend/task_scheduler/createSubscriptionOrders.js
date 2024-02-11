import cron from 'node-cron'; 
import User from '../models/user.js';
import SubscriptionOrder from '../models/subscriptionOrder.js';

const createSubscriptionOrders = async () => {
  try {
    const users = await User.find({ role: 'customer', customerType: 'subscriber' })
      .populate({
        path: 'subscription_id',
        populate: { path: 'service_id' }
      });

    users.forEach(async (user) => {
      const subscription = user.subscription_id;
      const service = subscription.service_id;

      const pickupDetails = {
        pickupDate: new Date(),
        pickupTime: '10:00 AM to 2:00 PM'
      };

      if (new Date().getDay() === 2) {
        pickupDetails.pickupDate.setDate(pickupDetails.pickupDate.getDate() + 1); // Wednesday
      } else if (new Date().getDay() === 6) {
        pickupDetails.pickupDate.setDate(pickupDetails.pickupDate.getDate() + 2); // Sunday
      } else {
        return; // Skip if not Tuesday or Saturday
      }

      const subscriptionOrder = new SubscriptionOrder({
        order_id: generateOrderId(), // Implement this function to generate unique order ID
        order_type: 'subscription',
        service: service._id,
        customer: user._id,
        status: 'pending',
        pickupDetails: pickupDetails,
        subscription_id: subscription._id
      });

      await subscriptionOrder.save();
    });

    console.log('Subscription orders created successfully',users);
  } catch (error) {
    console.error('Error creating subscription orders:', error);
  }
};

const createSubscriptionOrdersCron = cron.schedule('* * * * * *', () => {
  console.log('Running cron job every 5 minutes...');
  createSubscriptionOrders();
});

const generateOrderId = () => {


};

export default createSubscriptionOrdersCron;
