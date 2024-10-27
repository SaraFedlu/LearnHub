import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuizDetails() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuiz(response.data);
            } catch (error) {
                console.error('Error fetching quiz:', error.response.data.msg);
            }
        };
        fetchQuiz();
    }, [id]);

    if (!quiz) {
        return <p>Loading quiz...</p>;
    }

    return (
        <div>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <h4>Question {index + 1}</h4>
                    <p>{q.question}</p>
                    <ul>
                        {q.options.map((option, optIndex) => (
                            <li key={optIndex}>{option}</li>
                        ))}
                    </ul>
                    <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                </div>
            ))}
        </div>
    );
}

export default QuizDetails;