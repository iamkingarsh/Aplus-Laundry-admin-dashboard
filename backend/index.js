// index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';
 
import errorHandler from './middleware/error.js';
import orderRouter from './routes/order.js';
import productRouter from './routes/product.js';
import serviceRouter from './routes/service.js';
import couponRouter from './routes/coupon.js';
import appBannerRouter from './routes/appBanner.js';
import categoryRouter from './routes/category.js';
import transactionRouter from './routes/transaction.js';
import razorpaySubcriptionRouter from './routes/razorpaysubcriptions.js';
import planPricing from './routes/planPricing.js';
import checkSubscription from './task_scheduler/subscriptionCron.js'; // Import the task
import createSubscriptionOrdersCron from './task_scheduler/createSubscriptionOrders.js';
import subscriptionTransactionRouter from './routes/subscriptionTransaction.js';
import deviceTokenRouter from './routes/deviceToken.js';

 
dotenv.config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

const app = express();
app.use(express.json())

// Enable CORS for a specific origin
app.use(cors({ origin: '*' }));

app.listen(process.env.PORT, () => {
  console.log('Server listening on port ' + process.env.PORT);
});
//basic home route
app.get("/", (req, res) => {
  res.send("home");
});
 
app.use('/auth', authRoute);
app.use('/category', categoryRouter)
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/service', serviceRouter);
app.use('/coupon', couponRouter);
app.use('/appBanner', appBannerRouter);
app.use('/transaction', transactionRouter)
app.use('/razorpaySubscription', razorpaySubcriptionRouter)
app.use('/planPricing', planPricing)  
app.use('/subscription', subscriptionTransactionRouter)  
app.use('/deviceToken', deviceTokenRouter)  


checkSubscription.start()
createSubscriptionOrdersCron.start()
 
app.use(errorHandler);
