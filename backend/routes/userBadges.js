const express = require('express');
const router = express.Router();
const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get all badges earned by the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userBadges = await UserBadge.find({ userId: req.user.userId }).populate('badgeId');
        const badges = userBadges.map(userBadge => ({
            _id: userBadge.badgeId._id,
            name: userBadge.badgeId.name,
            description: userBadge.badgeId.description,
            icon: userBadge.badgeId.icon
        }));
        res.json(badges);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;