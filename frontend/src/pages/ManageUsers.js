// ManageUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Row, Col, FormGroup, Label, Input } from 'reactstrap';

function ManageUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response?.data?.msg || error.message);
            }
        };

        fetchUsers();
    }, []);

    const updateUserRole = async (userId, role) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${userId}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('User role updated successfully');
        } catch (error) {
            console.error('Error updating user role:', error.response?.data?.msg || error.message);
        }
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">User Management</h2>
            <Row>
                {users.map(user => (
                    <Col md="6" lg="4" key={user._id} className="mb-4">
                        <Card className="shadow-sm h-100">
                            <CardBody>
                                <CardTitle tag="h5">{user.name}</CardTitle>
                                <p><strong>Current Role:</strong> {user.role}</p>
                                <FormGroup>
                                    <Label for="roleSelect">Update Role</Label>
                                    <Input
                                        type="select"
                                        id="roleSelect"
                                        value={user.role}
                                        onChange={(e) => updateUserRole(user._id, e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                    </Input>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ManageUsers;