// CreateBadge.js
import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';

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
        <Card className="shadow-sm mb-4">
            <CardBody>
                <CardTitle tag="h3" className="mb-4 text-center">Create New Badge</CardTitle>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="name">Badge Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter badge name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Enter badge description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="criteria">Criteria</Label>
                        <Input
                            type="text"
                            id="criteria"
                            name="criteria"
                            placeholder="e.g., Complete 10 quizzes"
                            value={formData.criteria}
                            onChange={handleChange}
                            required
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="icon">Icon URL</Label>
                        <Input
                            type="text"
                            id="icon"
                            name="icon"
                            placeholder="Enter URL for badge icon"
                            value={formData.icon}
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" color="primary" block>
                        Create Badge
                    </Button>
                </Form>
            </CardBody>
        </Card>
    );
}

export default CreateBadge;