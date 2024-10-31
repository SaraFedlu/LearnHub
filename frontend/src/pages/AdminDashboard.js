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

    return (
        <div className="container my-5">
            <h2 className="mb-4">Admin Dashboard</h2>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <h5>Manage Users</h5>
                        <p>View and manage all users registered on the platform.</p>
                        <Link to="/admin/users" className="btn btn-primary">Go to Users</Link>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <h5>Manage Quizzes</h5>
                        <p>View, edit, and delete quizzes created by users.</p>
                        <Link to="/admin/quizzes" className="btn btn-primary">Go to Quizzes</Link>
                    </div>
                </div>
                <div className="col-md-6 mb-3">
                    <div className="card p-3">
                        <h5>Manage Badges</h5>
                        <p>Create and manage badges for achievements.</p>
                        <Link to="/admin/badge-management" className="btn btn-primary">Go to Badges</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;