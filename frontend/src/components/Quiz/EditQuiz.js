// EditQuiz.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

function EditQuiz() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: [{ question: '', options: ['', '', '', ''], correctAnswer: '' }]
    });

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuizData(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error.response?.data?.msg || error.message);
            }
        };

        fetchQuiz();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index][field] = value;
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex].options[optIndex] = value;
        setQuizData({ ...quizData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [...quizData.questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/quizzes/${id}`, quizData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Quiz updated successfully');
            navigate(`/quizzes/${id}`);
        } catch (error) {
            console.error('Error updating quiz:', error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="container my-5">
            <Card className="shadow-lg">
                <CardBody>
                    <CardTitle tag="h2" className="text-center mb-4">Edit Quiz</CardTitle>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="title">Quiz Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter quiz title"
                                value={quizData.title}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Quiz Description</Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Enter quiz description"
                                value={quizData.description}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>

                        {quizData.questions.map((question, qIndex) => (
                            <Card className="mb-4 shadow-sm" key={qIndex}>
                                <CardBody>
                                    <CardTitle tag="h5">Question {qIndex + 1}</CardTitle>
                                    <FormGroup>
                                        <Label>Question Text</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter question"
                                            value={question.question}
                                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                                            required
                                        />
                                    </FormGroup>

                                    <Row>
                                        {question.options.map((option, optIndex) => (
                                            <Col xs="6" key={optIndex}>
                                                <FormGroup>
                                                    <Label>Option {optIndex + 1}</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        ))}
                                    </Row>

                                    <FormGroup>
                                        <Label>Correct Answer</Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter correct answer"
                                            value={question.correctAnswer}
                                            onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                                            required
                                        />
                                    </FormGroup>
                                </CardBody>
                            </Card>
                        ))}

                        <Button type="button" color="secondary" onClick={addQuestion} className="mb-4">
                            Add Question
                        </Button>
                        <Button type="submit" color="primary" block>
                            Save Changes
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default EditQuiz;