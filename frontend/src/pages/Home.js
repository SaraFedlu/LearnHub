import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="container my-5">
            <div className="text-center">
                <h1>Welcome to QuizPlatform</h1>
                <p>Challenge yourself with exciting quizzes and track your progress. Join us to enhance your knowledge!</p>
                <Link to="/register" className="btn btn-primary mx-2">Get Started</Link>
                <Link to="/login" className="btn btn-secondary mx-2">Login</Link>
            </div>
            <div className="row mt-5">
                <div className="col-md-4 text-center">
                    <h3>Create Quizzes</h3>
                    <p>As a quiz creator, craft unique quizzes to engage learners worldwide.</p>
                </div>
                <div className="col-md-4 text-center">
                    <h3>Track Progress</h3>
                    <p>Stay motivated and see how much you've learned by tracking your progress.</p>
                </div>
                <div className="col-md-4 text-center">
                    <h3>Earn Badges</h3>
                    <p>Complete quizzes, reach milestones, and earn badges for your achievements.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
