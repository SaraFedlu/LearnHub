const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { authMiddleware } = require('../middleware/authMiddleware'); // To protect routes
const { roleMiddleware } = require('../middleware/roleMiddleware');

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
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all quizzes (GET /api/quizzes)
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find().populate('userId', 'name');
        res.json(quizzes);
    } catch (error) {
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
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;