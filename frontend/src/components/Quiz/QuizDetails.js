import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Add the user data from local storage or context
const userRole = localStorage.getItem('userRole');
const userId = localStorage.getItem('userId');

function QuizDetails() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(true);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    console.log('Quiz User ID:', quiz.userId);
    console.log('Current User ID:', userId);
    console.log('User Role:', userRole);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data); // Set quiz data
            } catch (error) {
                console.error('Error fetching quiz:', error.response ? error.response.data.msg : error.message);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchQuiz();
    }, [id]);

    if (loading) {
        return <p>Loading quiz...</p>;
    }

    // If quiz is still null after loading, display an error message
    if (!quiz) {
        return <p>Quiz not found.</p>;
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>

            {/* Only show the Edit button if the user is the creator or an admin */}
            {(quiz.userId === userId || userRole === 'admin') && (
                <button onClick={() => navigate(`/edit-quiz/${quiz._id}`)}>Edit Quiz</button>
            )}
            
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <h4>Question {index + 1}</h4>
                    <p>{q.question}</p>
                    <ul>
                        {q.options.map((option, optIndex) => (
                            <li key={optIndex}>{option}</li>
                        ))}
                    </ul>
                    <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                </div>
            ))}
        </div>
    );
}

export default QuizDetails;