import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Add the user data from local storage or context
const userRole = localStorage.getItem('userRole');
const userId = localStorage.getItem('userId');

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error.response.data.msg);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div>
            <h2>Available Quizzes</h2>
            <ul>
                {quizzes.map((quiz) => (
                    <li key={quiz._id}>
                        {/* different link for user and staff */}
                        {(userRole === 'staff' || userRole === 'admin') && (
                            <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
                        )}
                        {(userRole === 'user') && (
                            <Link to={`/quizzes/take/${quiz._id}`}>{quiz.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;