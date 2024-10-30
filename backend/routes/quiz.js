const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');
const { authMiddleware } = require('../middleware/authMiddleware'); // To protect routes
const { roleMiddleware } = require('../middleware/roleMiddleware');
const UserBadge = require('../models/UserBadge');
const Badge = require('../models/Badge');

// Define criteria checks
const checkBadgeEligibility = async (userId) => {
    const completedQuizzes = await Progress.countDocuments({ userId });
    const highScoreCount = await Progress.countDocuments({ userId, score: { $gte: 2 } });

    const badgesToAward = [];

    // Quiz Master badge: Complete 10 quizzes
    if (completedQuizzes >= 10) {
        const badge = await Badge.findOne({ name: 'Quiz Master' });
        if (badge) {
            const alreadyAwarded = await UserBadge.findOne({ userId, badgeId: badge._id });
            if (!alreadyAwarded) badgesToAward.push(badge);
        }
        
    }

    // High Scorer badge: Score 80% or higher on 5 quizzes
    if (highScoreCount >= 5) {
        const badge = await Badge.findOne({ name: 'High Scorer' });
        if (badge) {
            const alreadyAwarded = await UserBadge.findOne({ userId, badgeId: badge._id });
            if (!alreadyAwarded) badgesToAward.push(badge);
        }
    }

    // Award any earned badges
    for (const badge of badgesToAward) {
        await UserBadge.create({ userId, badgeId: badge._id });
    }
};

// Create a quiz (only accessible to admins)
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, questions } = req.body;

    if (req.user.role !== 'staff' && req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied' });
    }

    try {
        const newQuiz = new Quiz({
            title,
            description,
            questions,
            userId: req.user.userId
        });

        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// delete quiz
router.delete('/:id', authMiddleware, roleMiddleware('admin'), async (req, res) => {
    const quizId = req.params.id;

    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);

        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Edit a quiz (accessible to creator or admin)
router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        // Find the quiz by ID
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        // Check if the user is the creator or an admin
        if (quiz.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied' });
        }

        // Update the quiz
        quiz.title = title || quiz.title;
        quiz.description = description || quiz.description;
        quiz.questions = questions || quiz.questions;

        await quiz.save();
        res.json({ msg: 'Quiz updated successfully', quiz });
    } catch (error) {
        console.error('Error in update route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all quizzes (GET /api/quizzes)
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('userId', 'name');
        res.json(quizzes);
    } catch (error) {
        console.error('Error in fetch all route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get a specific quiz by ID (GET /api/quizzes/:id)
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id).populate('userId', 'name');
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        console.error('Error in fetch route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/:id/submit', authMiddleware, async (req, res) => {
    const { answers } = req.body; // User's answers array

    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ msg: 'Quiz not found' });
        }

        // Calculate score
        let score = 0;
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        // Save progress
        await Progress.create({
            userId: req.user.userId,
            quizId: quiz._id,
            score,
            dateTaken: new Date()
        });

        // Check for badges
        await checkBadgeEligibility(req.user.userId);

        res.json({ score });
    } catch (error) {
        console.error('Error in submit route:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;