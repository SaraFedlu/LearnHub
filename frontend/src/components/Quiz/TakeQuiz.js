// TakeQuiz.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

function TakeQuiz() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuiz(response.data);
                setAnswers(new Array(response.data.questions.length).fill("")); // Initialize empty answers
            } catch (error) {
                console.error('Error fetching quiz:', error.response ? error.response.data.msg : error.message);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleAnswerChange = (questionIndex, answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = answer;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `http://localhost:5000/api/quizzes/${id}/submit`, 
                { answers },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            setScore(response.data.score); // Set score from response
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting quiz:', error.response ? error.response.data.msg : error.message);
        }
    };

    if (!quiz) return <p>Loading quiz...</p>;

    return (
        <div className="container my-5">
            <Card className="shadow-lg">
                <CardBody>
                    <CardTitle tag="h2" className="text-center mb-4">{quiz.title}</CardTitle>
                    <p className="text-muted text-center mb-4">{quiz.description}</p>

                    {!submitted ? (
                        <Form onSubmit={handleSubmit}>
                            {quiz.questions.map((question, index) => (
                                <Card key={index} className="mb-3 shadow-sm">
                                    <CardBody>
                                        <CardTitle tag="h5">Question {index + 1}</CardTitle>
                                        <p>{question.question}</p>
                                        <FormGroup>
                                            {question.options.map((option, optIndex) => (
                                                <div key={optIndex} className="form-check">
                                                    <Input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value={option}
                                                        checked={answers[index] === option}
                                                        onChange={() => handleAnswerChange(index, option)}
                                                        className="form-check-input"
                                                    />
                                                    <Label className="form-check-label">{option}</Label>
                                                </div>
                                            ))}
                                        </FormGroup>
                                    </CardBody>
                                </Card>
                            ))}
                            <Button type="submit" color="success" block className="mt-4">
                                Submit Quiz
                            </Button>
                        </Form>
                    ) : (
                        <div className="text-center">
                            <h4>Your Score: {score} / {quiz.questions.length}</h4>
                            <Button color="primary" onClick={() => navigate('/user-dashboard')} className="mt-3">
                                Back to Dashboard
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}

export default TakeQuiz;