// QuizList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Col, Row, Button } from 'reactstrap';

const userRole = localStorage.getItem('userRole');

function QuizList() {
    const [quizzes, setQuizzes] = useState([]);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        setUserRole(localStorage.getItem('userRole'));
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error.response ? error.response.data.msg : error.message);
            }
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Available Quizzes</h2>
            <Row>
                {quizzes.map((quiz) => (
                    <Col md="6" lg="4" key={quiz._id} className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <CardBody>
                                <CardTitle tag="h5">{quiz.title}</CardTitle>
                                <CardText className="text-muted">{quiz.description}</CardText>
                                <Link to={(userRole === 'user' ? `/quizzes/take/${quiz._id}` : `/quizzes/${quiz._id}`)}>
                                    <Button color="primary" block>
                                        {(userRole === 'user' ? 'Take Quiz' : 'View Quiz')}
                                    </Button>
                                </Link>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default QuizList;