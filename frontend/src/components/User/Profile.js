import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

function Profile() {
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [profileMessage, setProfileMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    
    useEffect(() => {
        // Fetch the current user's profile info
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/me', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProfileData({ name: response.data.name, email: response.data.email });
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };
        fetchProfile();
    }, []);

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/users/update-profile', profileData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProfileMessage("Profile updated successfully!");
        } catch (error) {
            setProfileMessage(error.response?.data?.msg || "Failed to update profile.");
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage(''); // Reset previous messages

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage("New passwords do not match.");
            return;
        }

        try {
            await axios.put('http://localhost:5000/api/users/change-password', passwordData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setPasswordMessage("Password changed successfully!");
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Error changing password:', error);
            setPasswordMessage(error.response?.data?.msg || "Failed to change password.");
        }
    };

    return (
        <div className="container my-5">
            <Row>
                <Col md="6">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">Update Profile</CardTitle>
                        <CardBody>
                            <Form onSubmit={handleProfileSubmit}>
                                {profileMessage && <p className="text-success">{profileMessage}</p>}
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input id="name" name="name" type="text" value={profileData.name} onChange={handleProfileChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange} required />
                                </FormGroup>
                                <Button type="submit" color="primary">Update Profile</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6">
                    <Card>
                        <CardTitle tag="h6" className="border-bottom p-3 mb-0">Change Password</CardTitle>
                        <CardBody>
                            <Form onSubmit={handlePasswordSubmit}>
                                {passwordMessage && <p className={passwordMessage.includes("successfully") ? "text-success" : "text-danger"}>{passwordMessage}</p>}
                                <FormGroup>
                                    <Label for="currentPassword">Current Password</Label>
                                    <Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">New Password</Label>
                                    <Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} required />
                                </FormGroup>
                                <Button type="submit" color="primary">Change Password</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Profile;