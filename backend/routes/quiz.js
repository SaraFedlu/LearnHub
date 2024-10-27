const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const { authMiddleware } = require('../middleware/authMiddleware'); // To protect routes

// Create a quiz (POST /api/quizzes)
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const newQuiz = new Quiz({
            title,
            description,
            questions,
            userId: req.user.userId // Grab user ID from token
        });
        
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
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