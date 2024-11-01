// CreateQuiz.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col
} from 'reactstrap';

function CreateQuiz() {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: [
            { question: '', options: ['', '', '', ''], correctAnswer: '' }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...quizData.questions];
        newQuestions[index][field] = value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const handleOptionChange = (qIndex, optIndex, value) => {
        const newQuestions = [...quizData.questions];
        newQuestions[qIndex].options[optIndex] = value;
        setQuizData({ ...quizData, questions: newQuestions });
    };

    const addQuestion = () => {
        setQuizData({
            ...quizData,
            questions: [
                ...quizData.questions,
                { question: '', options: ['', '', '', ''], correctAnswer: '' }
            ]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/quizzes', quizData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Quiz created successfully');
        } catch (error) {
            console.error('Error creating quiz:', error.response.data.msg);
        }
    };

    return (
        <div className="container my-5">
            <Card className="shadow-lg">
                <CardBody>
                    <CardTitle tag="h2" className="text-center mb-4">Create a Quiz</CardTitle>
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
                            Create Quiz
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}

export default CreateQuiz;