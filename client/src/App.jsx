import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import HomePage from './pages/HomePage.jsx'; 
import RecoverPassword from './pages/RecoverPasswordPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx'; 
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
};

export default App;
