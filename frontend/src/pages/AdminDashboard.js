// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response?.data?.msg || error.message);
            }
        };

        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error.response?.data?.msg || error.message);
            }
        };

        fetchUsers();
        fetchQuizzes();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Admin Dashboard</h2>
            <Row>
                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Manage Users</CardTitle>
                            <CardText>View and manage all users registered on the platform.</CardText>
                            <Button color="primary" tag={Link} to="/admin/users">
                                Go to Users
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Manage Quizzes</CardTitle>
                            <CardText>View, edit, and delete quizzes created by users.</CardText>
                            <Button color="primary" tag={Link} to="/admin/quizzes">
                                Go to Quizzes
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Manage Badges</CardTitle>
                            <CardText>Create and manage badges for achievements.</CardText>
                            <Button color="primary" tag={Link} to="/admin/badge-management">
                                Go to Badges
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default AdminDashboard;