import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <header className="bg-primary text-white p-3">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/" className="text-white text-decoration-none h4">QuizPlatform</Link>
                <nav>
                    <Link to="/" className="text-white mx-3">Home</Link>
                    {userRole === 'admin' && <Link to="/admin-dashboard" className="text-white mx-3">Admin Dashboard</Link>}
                    {userRole === 'staff' && <Link to="/staff-dashboard" className="text-white mx-3">Staff Dashboard</Link>}
                    {userRole === 'user' && <Link to="/user-dashboard" className="text-white mx-3">User Dashboard</Link>}
                    <Link to="/profile" className="text-white mx-3">Profile</Link>
                </nav>
                <div>
                    <span className="mr-3">Hello, {userName}</span>
                    <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </header>
    );
}

export default Header;