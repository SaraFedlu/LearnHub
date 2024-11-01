// QuizDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Button, Col, Row } from 'reactstrap';

const userRole = localStorage.getItem('userRole');
const userId = localStorage.getItem('userId');

function QuizDetails() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error.response ? error.response.data.msg : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    if (loading) return <p>Loading quiz...</p>;
    if (!quiz) return <p>Quiz not found.</p>;

    return (
        <div className="container my-5">
            <Card className="shadow-lg">
                <CardBody>
                    <CardTitle tag="h2" className="text-center mb-4">{quiz.title}</CardTitle>
                    <CardText className="text-muted text-center mb-4">{quiz.description}</CardText>

                    {(quiz.userId._id === userId || userRole === 'admin') && (
                        <div className="text-end mb-4">
                            <Button color="warning" onClick={() => navigate(`/edit-quiz/${quiz._id}`)}>
                                Edit Quiz
                            </Button>
                        </div>
                    )}

                    {quiz.questions.map((question, index) => (
                        <Card key={index} className="mb-3 shadow-sm">
                            <CardBody>
                                <CardTitle tag="h5">Question {index + 1}</CardTitle>
                                <CardText>{question.question}</CardText>
                                <ul>
                                    {question.options.map((option, optIndex) => (
                                        <li key={optIndex}>{option}</li>
                                    ))}
                                </ul>
                                <CardText>
                                    <strong>Correct Answer:</strong> {question.correctAnswer}
                                </CardText>
                            </CardBody>
                        </Card>
                    ))}
                </CardBody>
            </Card>
        </div>
    );
}

export default QuizDetails;