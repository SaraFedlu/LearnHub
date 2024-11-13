const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// Get current user profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// update profile
router.put('/update-profile', authMiddleware, async (req, res) => {

    try {
        const { name, email } = req.body;

        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.user.userId) {
            return res.status(400).json({ msg: "Email is already in use by another account" });
        }
        await User.findByIdAndUpdate(req.user.userId, { name, email });
        res.json({ msg: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update profile" });
    }
});

// change password
router.put('/change-password', authMiddleware, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.userId);

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Current password is incorrect" });

        // Update with new password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        
        res.json({ msg: "Password changed successfully" });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ msg: "Failed to change password" });
    }
});

module.exports = router;