import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Container, Row, Col, Button } from 'reactstrap';

function Home() {
    return (
        <div>
            <div className="hero-section text-center text-white py-5 mb-5">
                <Container>
                    <h1>Welcome to QuizPlatform</h1>
                    <p>Challenge yourself with exciting quizzes and track your progress. Join us to enhance your knowledge!</p>
                    <Button color="primary" tag={Link} to="/register" className="mx-2">Get Started</Button>
                    <Button color="secondary" tag={Link} to="/login" className="mx-2">Login</Button>
                </Container>
            </div>
            <Container>
                <Row className="text-center">
                    <Col md="4">
                        <Card className="shadow-sm mb-4">
                            <CardBody>
                                <CardTitle tag="h4">Create Quizzes</CardTitle>
                                <p>As a quiz creator, craft unique quizzes to engage learners worldwide.</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="shadow-sm mb-4">
                            <CardBody>
                                <CardTitle tag="h4">Track Progress</CardTitle>
                                <p>Stay motivated and see how much you've learned by tracking your progress.</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card className="shadow-sm mb-4">
                            <CardBody>
                                <CardTitle tag="h4">Earn Badges</CardTitle>
                                <p>Complete quizzes, reach milestones, and earn badges for your achievements.</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;