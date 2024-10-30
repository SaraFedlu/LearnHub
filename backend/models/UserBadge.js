const mongoose = require('mongoose');

const userBadgeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    badgeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Badge', required: true },
    dateEarned: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserBadge', userBadgeSchema);