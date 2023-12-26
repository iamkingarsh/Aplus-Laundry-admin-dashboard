import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.js';

import errorHandler from './middleware/error.js';
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

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
//basic home route
app.get("/", (req, res) => {
  res.send("home");
});
app.use('/register',authRoute);




app.use(errorHandler);
