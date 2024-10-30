import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    return (
        <div>
            <h2>My Progress</h2>
            <ul>
                {progress.map((entry) => (
                    <li key={entry._id}>
                        Quiz Title: {entry.quizId.title} - Score: {entry.score} - Date: {new Date(entry.dateTaken).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProgressTracking;