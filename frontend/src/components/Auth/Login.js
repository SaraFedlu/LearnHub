import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userId', response.data.userId);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response.data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" type="email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;