import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditQuiz() {
    const { id } = useParams(); // Get the quiz ID from the URL
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: [
            { question: '', options: ['', '', '', ''], correctAnswer: '' }
        ]
    });

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
                setQuizData(response.data); // Set the quiz data
            } catch (error) {
                console.error('Error fetching quiz:', error.response.data.msg);
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
            questions: [
                ...quizData.questions,
                { question: '', options: ['', '', '', ''], correctAnswer: '' }
            ]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/quizzes/${id}`, quizData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Quiz updated successfully');
            navigate(`/quizzes/${id}`); // Redirect to Quiz Details page
        } catch (error) {
            console.error('Error updating quiz:', error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Quiz</h2>
            <input
                name="title"
                placeholder="Quiz Title"
                value={quizData.title}
                onChange={handleChange}
            />
            <input
                name="description"
                placeholder="Quiz Description"
                value={quizData.description}
                onChange={handleChange}
            />

            {quizData.questions.map((q, qIndex) => (
                <div key={qIndex}>
                    <h4>Question {qIndex + 1}</h4>
                    <input
                        type="text"
                        placeholder="Question Text"
                        value={q.question}
                        onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                    />
                    
                    {q.options.map((opt, optIndex) => (
                        <input
                            key={optIndex}
                            type="text"
                            placeholder={`Option ${optIndex + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                        />
                    ))}
                    
                    <input
                        type="text"
                        placeholder="Correct Answer"
                        value={q.correctAnswer}
                        onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', e.target.value)}
                    />
                </div>
            ))}

            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Save Changes</button>
        </form>
    );
}

export default EditQuiz;