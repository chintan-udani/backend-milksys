const express = require('express');
const User = require('../models/users');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { fullName, phoneNo, address, city, pincode, email, password } = req.body;
    const uuid = uuidv4();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      phoneNo,
      address,
      city,
      pincode,
      email,
      password: hashedPassword,
      uuid, // Save the UUID along with user data
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!', uuid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong!' });
  }
});

module.exports = router;
