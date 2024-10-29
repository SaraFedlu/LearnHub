const express = require('express');
const router = express.Router();
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

module.exports = router;