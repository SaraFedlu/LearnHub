import React from 'react';
import { Link } from 'react-router-dom';

function UserDashboard() {
    return (
        <div>
            <h2>User Dashboard</h2>
            <ul>
                <li><Link to="/quizzes">Explore Quizzes</Link></li>
                <li><Link to="/my-progress">My Progress</Link></li>
            </ul>
        </div>
    );
}

export default UserDashboard;