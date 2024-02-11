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

      const today = new Date().getDay();
      if (today === 2 || today === 6) { // Tuesday (2) or Saturday (6)
        if (today === 2) {
          pickupDetails.pickupDate.setDate(pickupDetails.pickupDate.getDate() + 1); // Wednesday
        } else if (today === 6) {
          pickupDetails.pickupDate.setDate(pickupDetails.pickupDate.getDate() + 2); // Sunday
        }

        const subscriptionOrder = new SubscriptionOrder({
          order_id: await generateOrderId(), // Implement this function to generate unique order ID
          order_type: 'subscription',
          service: service._id,
          customer: user._id,
          status: 'pending',
          pickupDetails: pickupDetails,
          subscription_id: subscription._id
        });

        await subscriptionOrder.save();
      }
    });

    console.log('Subscription orders created successfully', users);
  } catch (error) {
    console.error('Error creating subscription orders:', error);
  }
};

const createSubscriptionOrdersCron = cron.schedule('0 23 * * 2,6', () => {
  console.log('Running cron job every Tuesday and Saturday at 11 PM...');
  createSubscriptionOrders();
});

const generateOrderId = async () => {
  try {
    // Get the number of documents in the SubscriptionOrder collection
    const orderCount = await SubscriptionOrder.countDocuments();
    return `All_SUB_${orderCount}`;
  } catch (error) {
    console.error('Error counting SubscriptionOrder documents:', error);
    return null;
  }
};

export default createSubscriptionOrdersCron;
