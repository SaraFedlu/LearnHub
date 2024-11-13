import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import QuizList from './components/Quiz/QuizList';
import QuizDetails from './components/Quiz/QuizDetails';
import CreateQuiz from './components/Quiz/CreateQuiz';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import ManageUsers from './pages/ManageUsers';
import ManageQuiz from './pages/ManageQuiz';
import AdminBadgeManagement from './pages/AdminBadgeManagement';
import EditQuiz from './components/Quiz/EditQuiz';
import Progress from './components/User/ProgressTracking';
import UpdateProfile from './components/User/Profile';
import TakeQuiz from './components/Quiz/TakeQuiz';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protected Routes */}
                <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/staff-dashboard" element={<ProtectedRoute><StaffDashboard /></ProtectedRoute>} />
                <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
                <Route path="/profile/edit" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
                <Route path="/admin/quizzes" element={<ProtectedRoute><ManageQuiz /></ProtectedRoute>} />
                <Route path="/admin/badge-management" element={<ProtectedRoute><AdminBadgeManagement /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute><ManageUsers /></ProtectedRoute>} />
                <Route path="/my-progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
                <Route path="/edit-quiz/:id" element={<ProtectedRoute><EditQuiz /></ProtectedRoute>} />
                <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
                <Route path="/quizzes" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
                <Route path="/quizzes/:id" element={<ProtectedRoute><QuizDetails /></ProtectedRoute>} />
                <Route path="/quizzes/take/:id" element={<ProtectedRoute><TakeQuiz /></ProtectedRoute>} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;