// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';
import './RegisterPage.css';

const RegisterPage = () => {
  const [registerType, setRegisterType] = useState('Disposer');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    spcb_authorization_number: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = { ...formData, user_type: registerType };

    try {
      await registerUser(submissionData);
      const successMessage = registerType === 'Disposer'
        ? 'Registration successful! Please login.'
        : 'Registration submitted! Your account is now pending approval.';
      toast.success(successMessage, { duration: 5000 });
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        {/* --- Toggle Buttons --- */}
        <div className="toggle-buttons">
          <button className={registerType === 'Disposer' ? 'active' : ''} onClick={() => setRegisterType('Disposer')}>
            Register as Disposer
          </button>
          <button className={registerType === 'Collector' ? 'active' : ''} onClick={() => setRegisterType('Collector')}>
            Register as Collector
          </button>
        </div>

        <h2>Create Your Account</h2>

        <form onSubmit={handleSubmit}>
          {/* Common Fields */}
          <div className="form-group">
            <label>{registerType === 'Disposer' ? 'Username' : 'Company/Organization Name'}:</label>
            <input type="text" name="username" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          {/* Collector-Only Field */}
          <>
            <div className="form-group">
              <label>Mobile Number:</label>
              <input type="tel" name="mobile_number" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input type="text" name="address" onChange={handleChange} />
            </div>
          </>

          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;