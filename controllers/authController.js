const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passportLogin = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const token = jwt.sign(
                { userId: req.user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );

            // Create an object with the token and user ID
            const authData = {
                token,
                user: req.user,
                message: "Authentication successful",
            };

            // Set the authData object as an HTTP-only cookie
            res.status(200).json(authData);
        } else {
            // User is not authenticated, return a response indicating so
            res.status(401).json({ message: "Google Authentication failed" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Compare the password with the hashed password
        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Create and sign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Return success response with the token
        res.json({
            user,
            message: 'Authentication successful',
            token
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logout = (req, res) => {
    // Perform user logout
    req.logout((err) => {
        if (err) {
            // Handle logout error
            return res.status(500).json({ success: false, msg: "Logout failed.", error: err });
        }
        // Redirect to the login page after successful logout
        return res.redirect(`${process.env.CLIENT_URL}/login`);
    });
};


module.exports = {
    login,
    logout,
    passportLogin
};
