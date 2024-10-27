import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                        <Link to={`/quizzes/${quiz._id}`}>{quiz.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuizList;