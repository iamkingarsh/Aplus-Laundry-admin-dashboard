import mongoose from "mongoose";
import { errorHandeler } from "../middleware/errorHandeler.utils.js";
import User from "../models/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"


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
   

    const token = jwt.sign({ id: validEmailUser._id }, process.env.JWT_SECRETKEY);
    res.cookie('accessToken', token, { httpOnly: true }).status(200).json(token);
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


 

 
 