import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function CreateBadge({ onBadgeCreated }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        criteria: '',
    });
    const [icon, setIcon] = useState(null); // File upload

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setIcon(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithFile = new FormData();
        formDataWithFile.append('name', formData.name);
        formDataWithFile.append('description', formData.description);
        formDataWithFile.append('criteria', formData.criteria);
        if (icon) formDataWithFile.append('icon', icon);
    
        try {
            await axios.post('http://localhost:5000/api/admin/badges', formDataWithFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            onBadgeCreated();
        } catch (error) {
            console.error("Error creating badge:", error.response?.data?.msg || error.message);
        }
    };    

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="name">Badge Name</Label>
                <Input type="text" name="name" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="text" name="description" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="criteria">Criteria</Label>
                <Input type="text" name="criteria" onChange={handleChange} required />
            </FormGroup>
            <FormGroup>
                <Label for="icon">Badge Icon (Image)</Label>
                <Input type="file" name="icon" onChange={handleFileChange} />
            </FormGroup>
            <Button type="submit" color="primary">Create Badge</Button>
        </Form>
    );
}

export default CreateBadge;