import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    const role = localStorage.getItem('userRole'); // Get role from local storage

    return (
        <nav>
            <Link to="/profile">Profile</Link>

            {role === 'admin' && <Link to="/admin-dashboard">Admin Dashboard</Link>}
            {role === 'staff' && <Link to="/staff-dashboard">Staff Dashboard</Link>}
            {role === 'user' && <Link to="/user-dashboard">User Dashboard</Link>}
        </nav>
    );
}

export default Navigation;