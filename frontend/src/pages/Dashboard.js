import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/');
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <Link to="/create-quiz">Create a Quiz</Link> | <Link to="/quizzes">View Quizzes</Link>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;