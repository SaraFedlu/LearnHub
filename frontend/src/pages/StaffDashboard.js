import React from 'react';
import { Link } from 'react-router-dom';

function StaffDashboard() {
    return (
        <div>
            <h2>Staff Dashboard</h2>
            <ul>
                <li><Link to="/create-quiz">Create New Quiz</Link></li>
                <li><Link to="/my-quizzes">View My Quizzes</Link></li>
            </ul>
        </div>
    );
}

export default StaffDashboard;
