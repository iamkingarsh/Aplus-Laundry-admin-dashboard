import User from '../models/user.js';

// Add or update a user with the role "customer"
export const createOrUpdateCustomer = async (req, res) => {
  try {
    const { id, fullName, email, mobileNumber, address, profileImg, customerType } = req.body;

    // Ensure the role is always "customer"
    const role = 'customer';

    // Check if the provided id exists in the User collection
    const existingUser = await User.findById(id);

    if (existingUser) {
      // If id exists, update the existing document
      existingUser.fullName = fullName;
      existingUser.email = email;
      existingUser.mobileNumber = mobileNumber;
      existingUser.address = address;
      existingUser.profileImg = profileImg;
      existingUser.role = role;
      existingUser.customerType = customerType;

      await existingUser.save();

      return res.status(200).json({ message: 'User updated successfully', user: existingUser });
    } else {
      // If id does not exist, create a new document
      const newUser = new User({
        fullName,
        email,
        mobileNumber,
        address,
        profileImg,
        role,
        customerType,
      });

      await newUser.save();

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



