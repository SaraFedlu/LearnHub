import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {

        // function to fetch all quizzes
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

    // Function to delete a quiz
    const deleteQuiz = async (quizId) => {
        try {
            await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setQuizzes(quizzes.filter(quiz => quiz._id !== quizId)); // Remove from local state
            alert('Quiz deleted successfully');
        } catch (error) {
            console.error('Error deleting quiz:', error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            <section>
                <h3>Quiz Management</h3>
                <ul>
                    {quizzes.map(quiz => (
                        <li key={quiz._id}>
                            {quiz.title}
                            <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
}

export default AdminDashboard;
