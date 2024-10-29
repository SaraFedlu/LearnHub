import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        // function to fetch all users
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/users', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error.response.data.msg);
            }
        };

        fetchUsers();
    }, []);

    // function to update user role
    const updateUserRole = async (userId, role) => {
        try {
            await axios.put(
                `http://localhost:5000/api/admin/users/${userId}/role`,
                { role },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('User role updated successfully');
        } catch (error) {
            console.error('Error updating user role:', error.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>

            
            <section>
                <h3>User Management</h3>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.name} - {user.role}
                            <select
                                value={user.role}
                                onChange={(e) => updateUserRole(user._id, e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                            </select>
                        </li>
                    ))}
                </ul>
            </section>

        </div>
    );
}

export default AdminDashboard;