import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBadge from '../components/Admin/CreateBadge';

function AdminBadgeManagement() {
    const [badges, setBadges] = useState([]);

    const fetchBadges = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/badges', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBadges(response.data);
        } catch (error) {
            console.error('Error fetching badges:', error.response ? error.response.data.msg : error.message);
        }
    };

    useEffect(() => {
        fetchBadges();
    }, []);

    const handleBadgeCreated = () => {
        fetchBadges(); // Refresh badges after creation
    };

    const handleDeleteBadge = async (badgeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/badges/${badgeId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBadges(badges.filter(badge => badge._id !== badgeId));
            alert('Badge deleted successfully');
        } catch (error) {
            console.error('Error deleting badge:', error.response ? error.response.data.msg : error.message);
        }
    };

    return (
        <div>
            <h2>Badge Management</h2>
            <CreateBadge onBadgeCreated={handleBadgeCreated} />
            <ul>
                {badges.map(badge => (
                    <li key={badge._id}>
                        <img src={badge.icon} alt={badge.name} width="30" height="30" /> {badge.name}
                        <p>{badge.description}</p>
                        <button onClick={() => handleDeleteBadge(badge._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminBadgeManagement;