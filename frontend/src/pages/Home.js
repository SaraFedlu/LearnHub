import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Welcome to LearnHub</h1>
            <p>Start by creating quizzes or testing your knowledge!</p>
            <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
        </div>
    );
}

export default Home;