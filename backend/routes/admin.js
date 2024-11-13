const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');
const Badge = require('../models/Badge');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');
const fs = require('fs');
const path = require('path');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/badges'); // Save to the 'uploads/badges' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});
const upload = multer({ storage });

// Get all users (Admin only)
router.get('/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
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
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});


// Create a badge (Admin only)
router.post('/badges', authMiddleware, roleMiddleware('admin'), upload.single('icon'), async (req, res) => {
    try {
        const { name, description, criteria } = req.body;
        const iconPath = req.file ? req.file.path : null;

        if (!name || !description || !criteria) {
            return res.status(400).json({ msg: "Please provide all required fields." });
        }

        const newBadge = new Badge({
            name,
            description,
            criteria,
            icon: iconPath,
        });

        await newBadge.save();
        res.status(201).json(newBadge);
    } catch (error) {
        res.status(500).json({ msg: 'Failed to create badge', error: error.message });
    }
});

// Get all badges (Admin only)
router.get('/badges', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const badges = await Badge.find();
        res.json(badges);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

// Delete a badge (Admin only)
router.delete('/badges/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    try {
        const badge = await Badge.findByIdAndDelete(req.params.id);
        if (!badge) return res.status(404).json({ msg: 'Badge not found' });

        if (badge.icon && fs.existsSync(badge.icon)) {
            fs.unlinkSync(badge.icon);
        }

        res.json({ msg: 'Badge deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting badge', error: error.message });
    }
});

module.exports = router;