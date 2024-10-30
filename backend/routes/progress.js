const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get user progress
router.get('/', authMiddleware, async (req, res) => {
    try {
        const progress = await Progress.find({ userId: req.user.userId }).populate('quizId', 'title');
        res.json(progress);
    } catch (error) {
        console.error('Error fetching progress:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;