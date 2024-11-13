// ManageQuiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Button, Row, Col } from 'reactstrap';

function ManageQuiz() {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quizzes/', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error.response?.data?.msg || error.message);
            }
        };

        fetchQuizzes();
    }, []);

    const deleteQuiz = async (quizId) => {
        if (window.confirm("Are you sure?")) {
            try {
                await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
                alert('Quiz deleted successfully');
            } catch (error) {
                console.error('Error deleting quiz:', error.response?.data?.msg || error.message);
            }
        }
        
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Quiz Management</h2>
            <Row>
                {quizzes.map(quiz => (
                    <Col md="6" lg="4" key={quiz._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <CardBody>
                                <CardTitle tag="h5">{quiz.title}</CardTitle>
                                <Button color="danger" onClick={() => deleteQuiz(quiz._id)}>Delete</Button>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ManageQuiz;