import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [badges, setBadges] = useState([]);

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

        const fetchBadges = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/user-badges', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setBadges(response.data);
            } catch (error) {
                console.error('Error fetching badges:', error.response ? error.response.data.msg : error.message);
            }
        };

        fetchUserData();
        fetchBadges();
    }, []);

    if (!userData) return <p>Loading user profile...</p>;

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>

            <h3>Badges Earned</h3>
            <ul>
                {badges.map(badge => (
                    <li key={badge._id}>
                        <img src={badge.icon} alt={badge.name} width="30" height="30" /> {badge.name} - {badge.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfile;