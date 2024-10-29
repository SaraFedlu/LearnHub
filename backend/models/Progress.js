const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    dateTaken: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Progress', progressSchema);