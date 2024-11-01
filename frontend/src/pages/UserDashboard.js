// UserDashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';

function UserDashboard() {
    const navigate = useNavigate();

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">User Dashboard</h2>
            <Row>
                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Available Quizzes</CardTitle>
                            <CardText>Take new quizzes and test your knowledge!</CardText>
                            <Button color="primary" onClick={() => navigate('/quizzes')}>
                                View Quizzes
                            </Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">My Progress</CardTitle>
                            <CardText>Track your quiz performance and view scores.</CardText>
                            <Button color="success" onClick={() => navigate('/my-progress')}>
                                View Progress
                            </Button>
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6" lg="4" className="mb-4">
                    <Card className="shadow-sm h-100">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Profile</CardTitle>
                            <CardText>Update your profile information and settings.</CardText>
                            <Button color="secondary" onClick={() => navigate('/profile')}>
                                Manage Profile
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default UserDashboard;