import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function TakeQuiz() {
    const { id } = useParams(); // Get quiz ID from URL
    const [quiz, setQuiz] = useState(null); // Quiz data
    const [answers, setAnswers] = useState([]); // User answers
    const [submitted, setSubmitted] = useState(false); // Submission state
    const [score, setScore] = useState(null); // Quiz score after submission
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill("")); // Initialize answers array
            } catch (error) {
                console.error('Error fetching quiz:', error.response ? error.response.data.msg : error.message);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (questionIndex, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, 
                { answers },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setScore(response.data.score); // Set score from the response
            setSubmitted(true); // Mark quiz as submitted
        } catch (error) {
            console.error('Error submitting quiz:', error.response ? error.response.data.msg : error.message);
        }
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>

            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    {quiz.questions.map((question, index) => (
                        <div key={index}>
                            <h4>{question.question}</h4>
                            {question.options.map((option, optIndex) => (
                                <label key={optIndex}>
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => handleAnswerChange(index, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Submit Quiz</button>
                </form>
            ) : (
                <div>
                    <h3>Your Score: {score} / {quiz.questions.length}</h3>
                    <button onClick={() => navigate('/user-dashboard')}>Back to Dashboard</button>
                </div>
            )}
        </div>
    );
}

export default TakeQuiz;