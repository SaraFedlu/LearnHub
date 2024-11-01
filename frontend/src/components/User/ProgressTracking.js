// ProgressTracking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText, Row, Col } from 'reactstrap';

function ProgressTracking() {
    const [progress, setProgress] = useState([]);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/progress', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProgress(response.data);
            } catch (error) {
                console.error('Error fetching progress:', error.response ? error.response.data.msg : error.message);
            }
        };

        fetchProgress();
    }, []);

    if (progress.length === 0) return <p className="text-center mt-5">No progress data available.</p>;

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">My Progress</h2>
            <Row>
                {progress.map((entry) => (
                    <Col md="6" lg="4" key={entry._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <CardBody>
                                <CardTitle tag="h5" className="text-primary">{entry.quizId.title}</CardTitle>
                                <CardText>
                                    <strong>Score:</strong> {entry.score}
                                </CardText>
                                <CardText>
                                    <strong>Date Taken:</strong> {new Date(entry.dateTaken).toLocaleDateString()}
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProgressTracking;