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
        <div className="container my-5">
            <h2>Badge Management</h2>
            <CreateBadge onBadgeCreated={fetchBadges} />
            <div className="row">
                {badges.map(badge => (
                    <div key={badge._id} className="col-md-4 mb-3">
                        <div className="card p-3">
                            <img src={badge.icon} alt={badge.name} className="card-img-top" style={{ maxHeight: '50px' }} />
                            <div className="card-body">
                                <h5 className="card-title">{badge.name}</h5>
                                <p className="card-text">{badge.description}</p>
                            </div>
                            <button className="btn btn-danger" onClick={() => handleDeleteBadge(badge._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminBadgeManagement;