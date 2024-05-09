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
import unirest from 'unirest'
import { stringify } from "qs";
// var unirest = require("unirest");


// export const register = async (req, res, next) => {
//   const {
//     id,
//     fullName,
//     mobileNumber,
//     role,
//     email,
//     customerType,
//     address,
//     profileImg,
//     pincode
//   } = req.body;

//   // Initialize userFields object
//   const userFields = {};

//   // Add fields if they exist in the request body
//   if (fullName) userFields.fullName = fullName;
//   if (profileImg) userFields.profileImg = profileImg;
//   if (role) userFields.role = role;
//   if (email) userFields.email = email;
//   if (customerType) userFields.customerType = customerType;
//   if (address) userFields.address = address;
//   if (pincode) userFields.pincode = pincode;

//   // Only include mobileNumber if it is provided and not null
//   if (mobileNumber !== undefined && mobileNumber !== null) {
//     userFields.mobileNumber = mobileNumber;
// console.log('hi1')

//   }

//   try {
// console.log('hi2')

// if (id) {
//   // Find the existing user
//   const existingUser = await User.findById(id);
//   if (!existingUser) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Remove fields that should not be updated
//   delete userFields.customerId;
//   delete userFields.subscription_id;

//   // Update only the provided fields
//   Object.assign(existingUser, userFields);

//   // Save the updated user
//   const updatedUser = await existingUser.save();

//   // Respond with success message and token
//   return res.status(200).json({ message: "User updated "});
// }
//     // Check if email is provided
//     if (email) {
//       const existingUserByEmail = await User.findOne({ email });
//       if (existingUserByEmail) {
//         return res.status(409).json({ message: "User already exists", user: existingUserByEmail });
//       }
//     }

//     // Check if mobile number is provided
//     if (mobileNumber !== undefined && mobileNumber !== null) {
//       const existingUserByMobile = await User.findOne({ mobileNumber });
//       if (existingUserByMobile) {
//         return res.status(409).json({ message: "User already exists", user: existingUserByMobile });
//       }
//     }

//     // Create a new user if ID is not provided
//     const newUserFields = {
//       ...userFields,
//       customerId: role === 'customer' ? `APL-${role.slice(0, 3).toUpperCase()}${new Date().getFullYear().toString().slice(2, 4)}${Math.floor(1000 + Math.random() * 9000)}` : undefined
//     };
//     const newUser = new User(newUserFields);
//     await newUser.save();

//     // Respond with success message
//     res.status(200).json({
//       ok: true,
//       message: "New user created",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

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

  // Initialize userFields object
  const userFields = {};

  // Add fields if they exist in the request body
  if (fullName) userFields.fullName = fullName;
  if (profileImg) userFields.profileImg = profileImg;
  if (role) userFields.role = role;
  if (email) userFields.email = email;
  if (customerType) userFields.customerType = customerType;
  if (address) userFields.address = address;
  if (pincode) userFields.pincode = pincode;

  // Only include mobileNumber if it is provided and not null
  if (mobileNumber !== undefined && mobileNumber !== null) {
    userFields.mobileNumber = mobileNumber;
  }

  try {
    // Check if email is provided
    if (email) {
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(409).json({ message: "User already exists", user: existingUserByEmail });
      }
    }

    // Check if mobile number is provided
    if (mobileNumber !== undefined && mobileNumber !== null) {
      const existingUserByMobile = await User.findOne({ mobileNumber });
      if (existingUserByMobile) {
        return res.status(409).json({ message: "User already exists", user: existingUserByMobile });
      }
    }

    // Create a new user
    const newUserFields = {
      ...userFields,
      customerId: role === 'customer' ? `APL-${role.slice(0, 3).toUpperCase()}${new Date().getFullYear().toString().slice(2, 4)}${Math.floor(1000 + Math.random() * 9000)}` : undefined
    };
    const newUser = new User(newUserFields);
    await newUser.save();

    // Respond with success message
    res.status(200).json({
      ok: true,
      message: "New user created",
    });
  } catch (err) {
    next(err);
  }
};



export const updateUser = async (req, res, next) => {
  const { id } = req.body;
  const userFieldsToUpdate = { ...req.body };
  delete userFieldsToUpdate.id; // Remove the 'id' field from the update object

  try {
    // Find the existing user
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only the provided fields
    Object.assign(existingUser, userFieldsToUpdate);

    // Save the updated user
    const updatedUser = await existingUser.save();

    // Respond with success message and token
    return res.status(200).json({ message: "User updated " });
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

export const sendOTPforAdminVerification = async (req, res) => {
  try {
    let user = req.body;
    console.log('req', req.body);
    const email = user.email;

    const validEmailUser = await User.findOne({ email });
    //uncomment this comment`
    if (!validEmailUser || !['owner', 'admin'].includes(validEmailUser.role)) {
      return res.status(403).json({
        msg: "User not authorized",
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
    await emailVerificationEmail(email, OTP, validEmailUser.fullName);

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
    await emailVerificationEmail(email, OTP, validEmailUser.fullName);

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


    // let OTP = Math.floor(Math.random() * 900000) + 100000;

    // console.log("OTP is generated", OTP);

    // Create a new UserOTP instance
    // let otp = new UserOTP({
    //   mobileNumber: mobileNumber,
    //   otp: OTP,
    //   createdAt: new Date(),
    //   expireAt: new Date() + 86400000,
    // });

    // console.log("OTP is about to be saved");

    // Save the OTP to the database
    // await otp.save();


    // var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://2factor.in/API/V1/7d3208f4-0209-11ef-8cbb-0200cd936042/SMS/${mobileNumber}/AUTOGEN/OTP_Template2`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log('res' + stringify(response.data));
        if (response.data.Status === "Success") {
          return res.status(200).send({
            ok: true,
            msg: "mobileNumber sent",
            data: response.data
          });
        }

      })
      .catch(function (error) {
        console.log(error);
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
    //uncomment this comment`

    // Check if the time difference is more than 15 minutes (900,000 milliseconds)
    // if (timeDifference > 900000) {
    //   // Delete OTP records for the user's email
    //   await UserOTP.deleteMany({
    //     email: email
    //   });

    //   return res
    //     .status(402)
    //     .send({
    //       msg: "Your OTP has expired, can't verify",
    //       ok: false
    //     });
    // }

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
    await emailVerificationSuccess(email)
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

    // // Find OTP records for the user's mobileNumber
    // const databaseotp = unirest('GET', `https://2factor.in/API/V1/7d3208f4-0209-11ef-8cbb-0200cd936042/SMS/VERIFY3/${mobileNumber}/${otp}`)
    //   .end(async function (res) {
    //     if (res.error) throw new Error(res.error);
    //     console.log("test" + res.raw_body);

    //     const matchingOTP = res.raw_body.Details === "OTP Matched";




    //     // Update user's mobileNumberVerified status
    //     const validmobileNumberUser = await User.findOne({
    //       mobileNumber
    //     });
    //     console.log(mobileNumber, validmobileNumberUser)
    //     if (!validmobileNumberUser) {
    //       return res.status(404).send({
    //         msg: "User not found",
    //         ok: false
    //       });
    //     }

    //     if (matchingOTP) {
    //       // Include user ID and role in the JWT token payload
    //       const tokenPayload = {
    //         id: validmobileNumberUser._id,
    //         role: validmobileNumberUser.role,
    //       };

    //       const Token = jwt.sign(tokenPayload, process.env.JWT_SECRETKEY);
    //       res.cookie('accessToken', Token, {
    //         httpOnly: true
    //       });

    //       // Delete OTP records for the user's mobileNumber

    //       // emailVerificationSuccess(email)
    //       return res.status(200).send({
    //         msg: "Mobile Number verified",
    //         ok: true,
    //         token: Token
    //       });
    //     }
    //   })

    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://2factor.in/API/V1/7d3208f4-0209-11ef-8cbb-0200cd936042/SMS/VERIFY3/${mobileNumber}/${otp}`,
      headers: {}
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.Status === "Success") {
          return res.status(200).send({
            ok: true,
            msg: "mobileNumber Verified",
            data: response.data
          });
        }
        if (response.data.Status === "Error") {
          return res.status(401).send({
            ok: false,
            msg: "Wrong OTP!",
            data: response.data
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        // return res.status(500).send({
        //   msg: error.message
        // });
        if (error) throw new Error(error);
      });



    // Check if the provided OTP matches any of the OTP records


    // Calculate the time difference
    // const currentTime = new Date();
    // const createdAt = new Date(matchingOTP.createdAt);
    // const timeDifference = currentTime - createdAt;

    // Check if the time difference is more than 15 minutes (900,000 milliseconds)
    // if (timeDifference > 900000) {
    //   // Delete OTP records for the user's mobileNumber
    //   await otp.deleteMany({
    //     mobileNumber: mobileNumber
    //   });

    //   return res
    //     .status(402)
    //     .send({
    //       msg: "Your OTP has expired, can't verify",
    //       ok: false
    //     });
    // }

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

export const addOrUpdateAddress = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);

    const userId = decodedToken.id;

    const { addressId, addressType, location, coordinates, city, pincode } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check for unique addressType within user's addresses
    const isAddressTypeUnique = user.address.every(addr => addr.addressType !== addressType);

    if (!isAddressTypeUnique) {
      return res.status(400).json({ success: false, message: 'AddressType must be unique for the user' });
    }

    const existingAddress = user.address.id(addressId);

    if (existingAddress) {
      // Update only specific fields (e.g., location, coordinates)
      existingAddress.location = location;
      existingAddress.coordinates = coordinates;
      console.log("Address updated");
    } else {
      // Add a new address
      user.address.push({ addressType, location, coordinates, city, pincode });
      console.log("New address added");
    }

    await user.save();

    return res.status(200).json({ success: true, message: 'Address added/updated successfully', data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


export const deleteAddress = async (req, res) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);

    const userId = decodedToken.id;
    const { addressId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.address.pull(addressId);

    await user.save();

    return res.status(200).json({ success: true, message: 'Address deleted successfully', data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


