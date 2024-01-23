import mongoose from "mongoose";
import {
  errorHandeler
} from "../middleware/errorHandeler.utils.js";
import User from "../models/user.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import UserOTP from "../models/otp.js";
import {
  emailVerificationEmail,
  emailVerificationSuccess
} from "../config/sendMail.js";
import { sendVerificationCode } from "../config/sendSms.js";
import axios from 'axios'


export const register = async (req, res, next) => {
  const {
    fullName,
    mobileNumber,
    role,
    email,
    customerType,
    address,
    profileImg,
    pincode
  } = req.body;

  // Filter out undefined or empty fields
  const userFields = {
    ...(fullName && { fullName }),
    ...(profileImg && { profileImg }),
    ...(mobileNumber && { mobileNumber }),
    ...(role && { role }),
    ...(email && { email }),
    ...(customerType && { customerType }),
    ...(address && { address }),
    ...(pincode && { pincode }),
  };

  try {
    // Check if the user already exists by email or mobileNumber
    const existingUser = await User.findOne({
      $or: [{ email }, { mobileNumber }]
    });

    if (existingUser) {
      // Update existing user with the provided fields
      await User.updateOne({ _id: existingUser._id }, { $set: userFields });
      const updatedUser = await User.findById(existingUser._id);

      const token = jwt.sign({
        id: updatedUser._id,
        role: updatedUser.role,
      }, process.env.JWT_SECRETKEY);

      return res.cookie('accessToken', token, {
        httpOnly: true
      }).status(200).json({
        message: "User updated",
        user: token
      });
    }

    // If the user does not exist, create a new user
    const newUser = new User(userFields);
    await newUser.save();

    const token = jwt.sign({
      id: newUser._id,
      role: newUser.role,
    }, process.env.JWT_SECRETKEY);

    res.cookie('accessToken', token, {
      httpOnly: true
    }).status(201).json({
      message: "New user created",
      user: token
    });
  } catch (err) {
    next(err);
  }
};



export const signin = async (req, res, next) => {
  const {
    email
  } = req.body;
  try {
    const validEmailUser = await User.findOne({
      email
    });
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

    const validEmailUser = await User.findOne({
      email
    });
    if (!validEmailUser) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }
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


    console.log('email email', email);
    // Continue with other operations, such as sending an email
    emailVerificationEmail(email, OTP);

    // Send the response
    res.status(200).send({
      ok: true,
      msg: "email sent"
    });
  } catch (error) {
    console.error("Error in sendOTPforverification:", error);
    res.status(500).send({
      msg: error.message
    });
  }
};



export const sendOTPforMobileverification = async (req, res) => {
  try {
    let user = req.body;
    console.log('req', req.body);
    const mobileNumber = user.mobileNumber;
    const validmobileNumberUser = await User.findOne({
      mobileNumber
    });
    console.log('validmobileNumberUser', validmobileNumberUser)
    // mobileNumberVerificationmobileNumber(mobileNumber, OTP);
    if (!validmobileNumberUser) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }


    let OTP = Math.floor(Math.random() * 900000) + 100000;

    console.log("OTP is generated", OTP);

    // Create a new UserOTP instance
    let otp = new UserOTP({
      mobileNumber: mobileNumber,
      otp: OTP,
      createdAt: new Date(),
      expireAt: new Date() + 86400000,
    });

    console.log("OTP is about to be saved");

    // Save the OTP to the database
    await otp.save();
    // // Send OTP via 2factor.in API
    const response = await axios.post(
      `https://2factor.in/API/V1/f7a67a1f-b7d4-11ee-8cbb-0200cd936042/SMS/${mobileNumber}/${OTP}/GROMER`
    );
    // const verification = await sendVerificationCode(`+91${mobileNumber}`);
    console.log("OTP is saved in the database");


    console.log('mobileNumber mobileNumber', mobileNumber);
    // Continue with other operations, such as sending an mobileNumber

    // Send the response
    res.status(200).send({
      ok: true,
      msg: "mobileNumber sent"
    });
  } catch (error) {
    console.error("Error in sendOTPforverification:", error);
    res.status(500).send({
      msg: error.message
    });
  }
};


export const verifyotp = async (req, res) => {
  try {
    let user = req.body;
    console.log('user', user.email);
    const email = req.mobileNo || user.email;

    if (!user) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }

    const {
      otp
    } = req.body;

    // Find OTP records for the user's email
    const databaseotp = await UserOTP.find({
      email: email
    });

    if (!databaseotp || databaseotp.length === 0) {
      return res.status(404).send({
        msg: "No OTP records found",
        ok: false
      });
    }

    // Check if the provided OTP matches any of the OTP records
    const matchingOTP = databaseotp.find((record) => record.otp == otp);

    if (!matchingOTP) {
      return res.status(401).send({
        msg: "Wrong OTP!",
        ok: false
      });
    }

    // Calculate the time difference
    const currentTime = new Date();
    const createdAt = new Date(matchingOTP.createdAt);
    const timeDifference = currentTime - createdAt;

    // Check if the time difference is more than 15 minutes (900,000 milliseconds)
    if (timeDifference > 900000) {
      // Delete OTP records for the user's email
      await UserOTP.deleteMany({
        email: email
      });

      return res
        .status(402)
        .send({
          msg: "Your OTP has expired, can't verify",
          ok: false
        });
    }

    // Update user's emailVerified status
    const validEmailUser = await User.findOne({
      email
    });
    console.log(email, validEmailUser)
    if (!validEmailUser) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }

    // Include user ID and role in the JWT token payload
    const tokenPayload = {
      id: validEmailUser._id,
      role: validEmailUser.role,
    };

    const Token = jwt.sign(tokenPayload, process.env.JWT_SECRETKEY);
    res.cookie('accessToken', Token, {
      httpOnly: true
    });

    // Delete OTP records for the user's email
    await UserOTP.deleteMany({
      email: email
    });
    emailVerificationSuccess(email)
    res.status(200).send({
      msg: "Email verified",
      ok: true,
      token: Token
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Internal Server Error",
      ok: false
    });
  }
};

export const verifymobileotp = async (req, res) => {
  try {
    let user = req.body;
    console.log('user', user);
    const mobileNumber = req.mobileNo || user.mobileNumber;

    if (!user) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }

    const {
      otp
    } = req.body;

    // Find OTP records for the user's mobileNumber
    const databaseotp = await UserOTP.find({
      mobileNumber: mobileNumber
    });

    if (!databaseotp || databaseotp.length === 0) {
      return res.status(404).send({
        msg: "No OTP records found",
        ok: false
      });
    }

    // Check if the provided OTP matches any of the OTP records
    const matchingOTP = databaseotp.find((record) => record.otp == otp);

    if (!matchingOTP) {
      return res.status(401).send({
        msg: "Wrong OTP!",
        ok: false
      });
    }

    // Calculate the time difference
    const currentTime = new Date();
    const createdAt = new Date(matchingOTP.createdAt);
    const timeDifference = currentTime - createdAt;

    // Check if the time difference is more than 15 minutes (900,000 milliseconds)
    if (timeDifference > 900000) {
      // Delete OTP records for the user's mobileNumber
      await otp.deleteMany({
        mobileNumber: mobileNumber
      });

      return res
        .status(402)
        .send({
          msg: "Your OTP has expired, can't verify",
          ok: false
        });
    }

    // Update user's mobileNumberVerified status
    const validmobileNumberUser = await User.findOne({
      mobileNumber
    });
    console.log(mobileNumber, validmobileNumberUser)
    if (!validmobileNumberUser) {
      return res.status(404).send({
        msg: "User not found",
        ok: false
      });
    }

    // Include user ID and role in the JWT token payload
    const tokenPayload = {
      id: validmobileNumberUser._id,
      role: validmobileNumberUser.role,
    };

    const Token = jwt.sign(tokenPayload, process.env.JWT_SECRETKEY);
    res.cookie('accessToken', Token, {
      httpOnly: true
    });

    // Delete OTP records for the user's mobileNumber
    await UserOTP.deleteMany({
      mobileNumber: mobileNumber
    });
    // emailVerificationSuccess(email)
    res.status(200).send({
      msg: "Mobile Number verified",
      ok: true,
      token: Token
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      msg: "Internal Server Error",
      ok: false
    });
  }
};

export const getAllCustomers = async (req, res, next) => {
  try {
    const customers = await User.find({ role: 'customer' });
    res.status(200).json(customers);
  } catch (error) {
    // Handle errors, you can customize this part based on your application's error handling strategy
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAlldeliveryagent = async (req, res, next) => {
  try {
    const deliveryagents = await User.find({ role: 'deliveryagent' });
    res.status(200).json(deliveryagents);
  } catch (error) {
    // Handle errors, you can customize this part based on your application's error handling strategy
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getallTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await User.find({ role: 'admin' || 'owner' });
    res.status(200).json(teamMembers);
  } catch (error) {
    // Handle errors, you can customize this part based on your application's error handling strategy
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deletebyid = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if the user ID is valid (optional)
    // if (!isValidUserId(userId)) {
    //   return res.status(400).json({ error: "Invalid User ID" });
    // }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with a success message or the deleted user details
    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    // Handle errors, you can customize this part based on your application's error handling strategy
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const foundUser = await User.findById(userId);

    // Check if the user is not found
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user data
    res.status(200).json({ user: foundUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



export const getCurrentUserById = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Check if the user ID is valid (optional)
    // if (!isValidUserId(userId)) {
    //   return res.status(400).json({ error: "Invalid User ID" });
    // }

    // Find the user by ID
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user data
    res.status(200).json({ user: foundUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCurrentUser = async (req, res, next) => {
  console.log(' authenticateToken', req.body.token);

  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(' decoded decoded', decoded);

    // Check if the required role is present in the decoded token
    if (!decoded.role || !['owner', 'admin', 'deliveryagent', 'customer'].includes(decoded.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Fetch user details based on the user ID obtained from the token
    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user: user });

  } catch (err) {
    console.error('Token verification error:', err.message);
    return res.status(403).json({ message: 'Forbidden' });
  }
};
