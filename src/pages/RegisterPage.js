import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    user_type: 'Disposer', // Default value
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success('Registration successful! Please log in.'); // <-- Replace alert
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. The user may already exist.'); // <-- Replace alert
    }
  };

  return (
    <div>
      <h2>Register a New Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div>
          <label>I am a:</label>
          <div>
            <input type="radio" id="disposer" name="user_type" value="Disposer" checked={formData.user_type === 'Disposer'} onChange={handleChange} />
            <label htmlFor="disposer">Disposer (I have e-waste)</label>
          </div>
          <div>
            <input type="radio" id="collector" name="user_type" value="Collector" checked={formData.user_type === 'Collector'} onChange={handleChange} />
            <label htmlFor="collector">Collector (I want e-waste)</label>
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;