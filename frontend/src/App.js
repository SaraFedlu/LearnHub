import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import QuizList from './components/Quiz/QuizList';
import QuizDetails from './components/Quiz/QuizDetails';
import CreateQuiz from './components/Quiz/CreateQuiz';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/create-quiz" element={<ProtectedRoute><CreateQuiz /></ProtectedRoute>} />
                <Route path="/quizzes" element={<ProtectedRoute><QuizList /></ProtectedRoute>} />
                <Route path="/quizzes/:id" element={<ProtectedRoute><QuizDetails /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;