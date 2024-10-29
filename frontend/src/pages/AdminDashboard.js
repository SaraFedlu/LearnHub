import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // function to fetch all users
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response.data.msg);
            }
        };

        // function to fetch all quizzes
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes');
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error.response.data.msg);
            }
        };

        fetchUsers();
        fetchQuizzes();
    }, []);

    // function to update user role
    const updateUserRole = async (userId, role) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${userId}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('User role updated successfully');
        } catch (error) {
            console.error('Error updating user role:', error.response.data.msg);
        }
    };

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

            <ul>
                <li><Link to="/admin/users">Manage Users</Link></li>
                <li><Link to="/admin/quizzes">Manage Quizzes</Link></li>
            </ul>
        </div>
    );
}

export default AdminDashboard;