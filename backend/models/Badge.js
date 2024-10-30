const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    criteria: { type: String, required: true }, // Criteria to earn the badge
    icon: { type: String } // Optional URL to an icon image for the badge
});

module.exports = mongoose.model('Badge', badgeSchema);