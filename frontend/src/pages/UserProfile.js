import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data.msg : error.message);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <p>Loading user profile...</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
        </div>
    );
}

export default UserProfile;