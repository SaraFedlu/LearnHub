import React, { useState } from 'react';
import axios from 'axios';

function CreateBadge({ onBadgeCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        criteria: '',
        icon: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/badges', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Badge created successfully');
            onBadgeCreated(); // Refresh badge list after creation
            setFormData({ name: '', description: '', criteria: '', icon: '' }); // Reset form
        } catch (error) {
            console.error('Error creating badge:', error.response ? error.response.data.msg : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Create New Badge</h3>
            <input
                type="text"
                name="name"
                placeholder="Badge Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="criteria"
                placeholder="Criteria (e.g., Complete 10 quizzes)"
                value={formData.criteria}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="icon"
                placeholder="Icon URL"
                value={formData.icon}
                onChange={handleChange}
            />
            <button type="submit">Create Badge</button>
        </form>
    );
}

export default CreateBadge;