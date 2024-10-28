const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// Get all users (Admin only)
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Update user role (Admin only)
router.put('/users/:id/role', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const { role } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.role = role;
        await user.save();

        res.json({ msg: 'User role updated', user });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;