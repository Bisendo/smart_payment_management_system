import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RequestDemo from './pages/Requestdemo';
import Payments from './pages/Payments';
import EduPayRegister from './pages/Register';
import LoginForm from './pages/Login';
import StudentDashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<EduPayRegister />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/demo" element={<RequestDemo />} />
        <Route path="/dashboard" element={<StudentDashboard/>} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;