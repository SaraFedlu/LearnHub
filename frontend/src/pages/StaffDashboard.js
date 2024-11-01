import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';

function StaffDashboard() {
    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Staff Dashboard</h2>
            <Row>
                <Col md="6">
                    <Card className="shadow-sm mb-4">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">Create New Quiz</CardTitle>
                            <Button color="primary" tag={Link} to="/create-quiz">
                                Create Quiz
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card className="shadow-sm mb-4">
                        <CardBody className="text-center">
                            <CardTitle tag="h5">View Quizzes</CardTitle>
                            <Button color="success" tag={Link} to="/quizzes">
                                View Quizzes
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default StaffDashboard;