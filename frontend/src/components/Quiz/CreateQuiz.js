import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: [
            { question: '', options: ['', '', '', ''], correctAnswer: '' }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...quizData.questions];
        newQuestions[index][field] = value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const newQuestions = [...quizData.questions];
        newQuestions[qIndex].options[optIndex] = value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                { question: '', options: ['', '', '', ''], correctAnswer: '' }
            ]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/quizzes', quizData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Quiz created successfully');
        } catch (error) {
            console.error('Error creating quiz:', error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Quiz</h2>
            <input
                name="title"
                placeholder="Quiz Title"
                value={quizData.title}
                onChange={handleChange}
            />
            <input
                name="description"
                placeholder="Quiz Description"
                value={quizData.description}
                onChange={handleChange}
            />
            
            {quizData.questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <h4>Question {qIndex + 1}</h4>
                    <input
                        type="text"
                        placeholder="Question Text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    />
                    
                    {q.options.map((opt, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            placeholder={`Option ${optIndex + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                        />
                    ))}
                    
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    />
                </div>
            ))}

            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Create Quiz</button>
        </form>
    );
}

export default CreateQuiz;