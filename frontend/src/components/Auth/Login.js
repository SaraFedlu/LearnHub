// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col,
    Row
} from 'reactstrap';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userId', response.data.userId);
            localStorage.setItem('userName', response.data.name);

            if (response.data.role === 'admin') navigate('/admin-dashboard');
            else if (response.data.role === 'staff') navigate('/staff-dashboard');
            else navigate('/user-dashboard');
        } catch (error) {
            setError(error.response?.data?.msg || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <Row className="justify-content-center mt-5">
            <Col md="6" lg="4">
                <Card className="shadow-lg p-4">
                    <CardTitle tag="h3" className="text-center mb-4">
                        Login
                    </CardTitle>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    required
                                />
                            </FormGroup>
                            {error && <p className="text-danger text-center">{error}</p>}
                            <Button type="submit" color="primary" block>
                                Login
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
}

export default Login;