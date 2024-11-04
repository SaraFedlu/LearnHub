// AdminBadgeManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateBadge from '../components/Admin/CreateBadge';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';

function AdminBadgeManagement() {
    const [badges, setBadges] = useState([]);

    const fetchBadges = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/badges', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBadges(response.data);
        } catch (error) {
            console.error('Error fetching badges:', error.response?.data?.msg || error.message);
        }
    };

    useEffect(() => {
        fetchBadges();
    }, []);

    const handleDeleteBadge = async (badgeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/badges/${badgeId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setBadges(badges.filter(badge => badge._id !== badgeId));
            alert('Badge deleted successfully');
        } catch (error) {
            console.error('Error deleting badge:', error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Badge Management</h2>
            <CreateBadge onBadgeCreated={fetchBadges} />
            <Row>
                {badges.map(badge => (
                    <Col md="4" key={badge._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <CardBody className="text-center">
                                <img src={badge.icon} alt={badge.name} className="img-fluid mb-3" style={{ maxHeight: '60px' }} />
                                <CardTitle tag="h5">{badge.name}</CardTitle>
                                <p>{badge.description}</p>
                                <Button color="danger" onClick={() => handleDeleteBadge(badge._id)}>Delete</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default AdminBadgeManagement;