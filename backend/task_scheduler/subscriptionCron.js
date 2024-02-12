import cron from 'node-cron';
import User from '../models/user.js';
import SubscriptionTransaction from '../models/subscriptionTransaction.js';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const checkSubscription = cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.find({ customerType: 'subscriber' });
    console.log('users',users)

    // Iterate over each user
    for (const user of users) {
      let allInactive = true;  

      // Find all subscription transactions for the current user
      const subscriptionTransactions = await SubscriptionTransaction.find({ customer_id: user._id });

      console.log('transactiontransaction',subscriptionTransactions)
      // Iterate over each subscription transaction
      for (const transaction of subscriptionTransactions) {
          // Fetch subscription details from Razorpay
          const fetchedSubscription = await razorpay.subscriptions.fetch(transaction.razorpay_subscription_id);

        if (fetchedSubscription.status === 'active') {
          allInactive = false; 
          break;  
        }
      }

      // If all subscriptions are inactive, update user's customerType and remove subscription_id
      if (allInactive) {
        await User.findByIdAndUpdate(user._id, { $set: { customerType: 'nonsubscriber' }, $unset: { subscription_id: '' } });
        console.log(`User ${user._id}: All subscriptions are inactive. CustomerType updated to 'nonsubscriber'.`);
      }
    }

    console.log('Subscription check completed.');
  } catch (error) {
    console.error('Error checking subscriptions:', error);
  }
});

export default checkSubscription;
