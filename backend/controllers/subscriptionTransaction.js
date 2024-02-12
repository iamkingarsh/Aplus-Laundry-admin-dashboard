import Razorpay from "razorpay";
import SubscriptionOrder from "../models/subscriptionOrder.js";
import SubscriptionTransaction from "../models/subscriptionTransaction.js";
import Subscription from "../models/subscription.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const getAllTransactions = async (req, res) => {
    try {
      const transactions = await SubscriptionTransaction.find()
        .populate('customer_id', 'fullName email');
  
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      console.error('Error fetching subscription transactions:', error);
      res.status(500).json({ success: false, message: 'Error fetching subscription transactions' });
    }
  };


  export const getTransactionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const transaction = await SubscriptionTransaction.findById(id)
        .populate('customer_id', 'fullName email');
  
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
  
      res.status(200).json({ success: true, transaction });
    } catch (error) {
      console.error('Error fetching subscription transaction by ID:', error);
      res.status(500).json({ success: false, message: 'Error fetching subscription transaction' });
    }
  };


  export const getTransactionsByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const transactions = await SubscriptionTransaction.find({ customer_id: userId })
        .populate('customer_id', 'fullName email');
  
      res.status(200).json({ success: true, transactions });
    } catch (error) {
      console.error('Error fetching subscription transactions:', error);
      res.status(500).json({ success: false, message: 'Error fetching subscription transactions' });
    }
  };

  
  
  export const deleteTransactionById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the document exists
      const transaction = await SubscriptionTransaction.findById(id);
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }
  
      // Delete the document
      await SubscriptionTransaction.findByIdAndDelete(id);
  
      res.status(200).json({ success: true, message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ success: false, message: 'Error deleting transaction' });
    }
  };

  export const getAllSubscriptionOrders = async (req, res) => {
    try {
      const subscriptionOrders = await SubscriptionOrder.find()
        .populate('service')
        .populate({
          path: 'products.id',
          model: 'Product',
        })
        .populate('customer')
        .populate('delivery_agent')
        .populate('subscription_id');
  
      res.status(200).json({
        success: true,
        data: subscriptionOrders,
      });
    } catch (error) {
      console.error('Error fetching subscription orders:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };
  
  export const getSubscriptionOrderById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the SubscriptionOrder by ID and populate its referenced fields
      const subscriptionOrder = await SubscriptionOrder.findById(id)
        .populate('service')
        .populate('products.id') // Populate product references
        .populate('customer')
        .populate('delivery_agent')
        .populate('subscription_id');
  
      if (!subscriptionOrder) {
        return res.status(404).json({ message: 'SubscriptionOrder not found' });
      }
  
      res.status(200).json({ subscriptionOrder });
    } catch (error) {
      console.error('Error retrieving SubscriptionOrder:', error);
      res.status(500).json({ message: 'Error retrieving SubscriptionOrder' });
    }
  };


  // Controller function to get all SubscriptionOrders for a specific customer ID
export const getSubscriptionOrdersByCustomerId = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find all SubscriptionOrders where the customer ID matches the provided user ID
      const subscriptionOrders = await SubscriptionOrder.find({ customer: userId })
        .populate('service')
        .populate({
          path: 'products.id',
          model: 'Product',
        })
        .populate('customer')
        .populate('delivery_agent')
        .populate('subscription_id');
  
      res.status(200).json({
        success: true,
        data: subscriptionOrders,
      });
    } catch (error) {
      console.error('Error fetching subscription orders:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  };





  
  export const getAllSubscriptions = async (req, res) => {
    try {
      const subscriptions = await Subscription.find();
  
      const subscriptionsWithDetails = await Promise.all(subscriptions.map(async (subscription) => {
        const { razorpay_plan_id } = subscription;
        
        const planDetails = await razorpay.plans.fetch(razorpay_plan_id);
  
        const subscriptionWithPlanDetails = {
          ...subscription.toObject(),
          planDetails
        };
  
        return subscriptionWithPlanDetails;
      }));
  
      res.status(200).json({ success: true, subscriptions: subscriptionsWithDetails });
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      res.status(500).json({ success: false, message: 'Error fetching subscriptions' });
    }
  };



  export const getSubscriptionById = async (req, res) => {
    try {
      const { id } = req.params; // Assuming the subscription ID is passed in the request params
      const subscription = await Subscription.findById(id);
  
      if (!subscription) {
        return res.status(404).json({ success: false, message: 'Subscription not found' });
      }
  
      const { razorpay_plan_id } = subscription;
      const planDetails = await razorpay.plans.fetch(razorpay_plan_id);
  
      const subscriptionWithPlanDetails = {
        ...subscription.toObject(),
        planDetails
      };
  
      res.status(200).json({ success: true, subscription: subscriptionWithPlanDetails });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ success: false, message: 'Error fetching subscription' });
    }
  };
  

  export const fetchSubscribers = async (req, res) => {
    try {
        const {  razorpay_subscription_id } = req.body;
         
        const SubscriptionTransactionDetails = await razorpay.subscriptions.fetch(razorpay_subscription_id);

        res.status(200).json({ success: true, SubscriptionTransactionDetails });
    } catch (error) {
        console.error('Error fetching subscribers:', error);
        res.status(500).json({ success: false, message: 'Error fetching subscribers' });
    }
};