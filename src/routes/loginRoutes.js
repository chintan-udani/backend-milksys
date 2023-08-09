    // src/routes/authRoutes.js
    const express = require('express');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const User = require('../models/users');

    const router = express.Router();

    // Login route
router.post('/login', async (req, res) => {
   try {

    console.log(req.body);
        const { email, password } = req.body;


        // Check if the user with the given email exists
        const user = await User.findOne({ email });
    
        if (!user) {
           
          return res.status(401).json({ error: 'Invalid email or password' });
          
        }
    
        // Compare the provided password with the hashed password in the database
        const isPasswordMatch = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
    
        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: '1h', // Token expires in 1 hour
        });
        console.log(token);
        // Successful login
        res.status(200).json({ message: 'Login successful!', token, uuid: user.uuid }); // Sending the user data along with the token
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
    });

    module.exports = router;
