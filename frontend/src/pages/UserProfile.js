import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

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
        <div className="container my-5">
            <Row>
                <Col md="6">
                    <Card className="shadow-sm mb-4">
                        <CardBody>
                            <CardTitle tag="h4">User Profile</CardTitle>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Role:</strong> {userData.role}</p>
                        </CardBody>
                    </Card>
                </Col>
                {userData.role === 'user' && (
                    <Col md="6">
                        <Card className="shadow-sm">
                            <CardBody>
                                <CardTitle tag="h4">Badges Earned</CardTitle>
                                <ListGroup flush>
                                    {badges.map(badge => (
                                        <ListGroupItem key={badge._id} className="d-flex align-items-center">
                                            <img src={badge.icon} alt={badge.name} width="30" height="30" className="me-2" /> 
                                            <div>
                                                <strong>{badge.name}</strong> - {badge.description}
                                            </div>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </CardBody>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
}

export default UserProfile;