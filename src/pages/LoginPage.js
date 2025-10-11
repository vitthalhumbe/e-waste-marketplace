import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';
import './LoginPage.css'; // We'll create this new CSS file

const LoginPage = () => {
  const [loginType, setLoginType] = useState('Disposer'); // To toggle between user types
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '', // This will be the Collector ID
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = loginType === 'Disposer'
      ? { email: formData.email, password: formData.password }
      : { username: formData.username, password: formData.password };

    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* --- The Toggle Buttons --- */}
        <div className="toggle-buttons">
          <button
            className={loginType === 'Disposer' ? 'active' : ''}
            onClick={() => setLoginType('Disposer')}
          >
            Disposer Login
          </button>
          <button
            className={loginType === 'Collector' ? 'active' : ''}
            onClick={() => setLoginType('Collector')}
          >
            Collector Login
          </button>
        </div>

        <h2>Login to Your Account</h2>

        {/* --- The Form --- */}
        <form onSubmit={handleSubmit}>
          {loginType === 'Disposer' ? (
            // Disposer Fields
            <>
              <div>
                <label>Email:</label>
                <input type="email" name="email" onChange={handleChange} required />
              </div>
            </>
          ) : (
            // Collector Fields
            <>
              <div>
                <label>Collector ID (Username):</label>
                <input type="text" name="username" onChange={handleChange} required />
              </div>
            </>
          )}

          {/* Common Field */}
          <div>
            <label>Password:</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;