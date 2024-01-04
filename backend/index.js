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
// const bodyParser = require('body-parser');



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
app.use('/auth',authRoute);
app.use('/order',orderRouter);
app.use('/product', productRouter);
app.use('/service', serviceRouter);
app.use('/coupon', couponRouter);
app.use('/appBanner',appBannerRouter);






app.use(errorHandler);
