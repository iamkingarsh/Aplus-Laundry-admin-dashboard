import mongoose from "mongoose";
import { errorHandeler } from "../middleware/errorHandeler.utils.js";
import User from "../models/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import  UserOTP from "../models/otp.js";
import { emailVerificationEmail, emailVerificationSuccess } from "../config/sendMail.js";



export const signup = async (req, res, next) => {
  const { fullName, mobileNumber, role ,email } = req.body;
  const newUser = new User({ fullName, mobileNumber, role, email});
  try {
    const validEmailUser = await User.findOne({ mobileNumber });
    if (validEmailUser) {
      return next(errorHandeler(404, 'User is already registered'));
    }
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETKEY);
    res.cookie('accessToken', token, { httpOnly: true }).status(201).json({ message: "New user created", user: token });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email } = req.body;
  try {
    const validEmailUser = await User.findOne({ email });
    if (!validEmailUser) {
      return next(errorHandeler(404, 'User not found'));
    }
   

    // const token = jwt.sign({ id: validEmailUser._id }, process.env.JWT_SECRETKEY);
    // res.cookie('accessToken', token, { httpOnly: true }).status(200).json(token);
  } catch (err) {
    next(err);
  }
};

// export const googleAuth = async (req, res, next) => {
//   const {email} = req.body.userData;
//   console.log(req.body.userData);

//   try {
//     const existingUser = await User.findOne({ email });

//     if (!existingUser) {
//       const newUser = new User({
//                 email,
        
//       });

//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRETKEY);
//       res.cookie('accessToken', token, { httpOnly: true }).status(201).json({ message: "User created", user: token });
//     } else {
//       const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRETKEY);
//       res.cookie('accessToken', token, { httpOnly: true }).status(200).json({ message: "User signed in", user: token });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

export const sendOTPforverification = async (req, res) => {
  try {
    let user = req.body;
    console.log('req', req.body);
    const email = user.email;

    let OTP = Math.floor(Math.random() * 900000) + 100000;

    console.log("OTP is generated", OTP);

    // Create a new UserOTP instance
    let otp = new UserOTP({
      email: email,
      otp: OTP,
      createdAt: new Date(),
      expireAt: new Date() + 86400000,
    });

    console.log("OTP is about to be saved");

    // Save the OTP to the database
    await otp.save();

    console.log("OTP is saved in the database");
    const validEmailUser = await User.findOne({ email });
        if (!validEmailUser) {
          return res.status(404).send({ msg: "User not found", ok: false });
        }

        console.log('email email', email);
    // Continue with other operations, such as sending an email
    emailVerificationEmail(email, OTP);

    // Send the response
    res.status(200).send({ ok: true, msg: "email sent" });
  } catch (error) {
    console.error("Error in sendOTPforverification:", error);
    res.status(500).send({ msg: error.message });
  }
};

 
export const verifyotp = async (req, res) => {
  try {
    let user = req.body;
    console.log('user',user.email);
    const email = req.mobileNo || user.email;

    if (!user) {
      return res.status(404).send({ msg: "User not found", ok: false });
    }

    const { otp } = req.body;

    // Find OTP records for the user's email
    const databaseotp = await UserOTP.find({ email: email });

    if (!databaseotp || databaseotp.length === 0) {
      return res.status(404).send({ msg: "No OTP records found", ok: false });
    }

    // Check if the provided OTP matches any of the OTP records
    const matchingOTP = databaseotp.find((record) => record.otp == otp);

    if (!matchingOTP) {
      return res.status(202).send({ msg: "Wrong OTP!", ok: false });
    }

    // Calculate the time difference
    const currentTime = new Date();
    const createdAt = new Date(matchingOTP.createdAt);
    const timeDifference = currentTime - createdAt;

    // Check if the time difference is more than 15 minutes (900,000 milliseconds)
    if (timeDifference > 900000) {
      // Delete OTP records for the user's email
      await UserOTP.deleteMany({ email: email });

      return res
        .status(202)
        .send({ msg: "Your OTP has expired, can't verify", ok: false });
    }

    // Update user's emailVerified status
    const validEmailUser = await User.findOne({ email });
console.log(email,validEmailUser)
    if (!validEmailUser) {
      return res.status(404).send({ msg: "User not found", ok: false });
    }

    const token = jwt.sign({ id: validEmailUser._id }, process.env.JWT_SECRETKEY);
    res.cookie('accessToken', token, { httpOnly: true });

    // Delete OTP records for the user's email
    await UserOTP.deleteMany({ email: email });
    emailVerificationSuccess(email)
    res.status(200).send({ msg: "Email verified", ok: true , token:token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Internal Server Error", ok: false });
  }
};


 
 