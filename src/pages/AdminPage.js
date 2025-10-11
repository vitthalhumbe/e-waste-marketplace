// src/pages/AdminPage.js
import React, { useState } from 'react';
import { getCollectors, updateCollectorStatus } from '../services/api';
import toast from 'react-hot-toast';
import './AdminPage.css';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [collectors, setCollectors] = useState([]);
  const [error, setError] = useState('');

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getCollectors(password);
      setCollectors(response.data);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Access Denied. Incorrect Password.');
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      await updateCollectorStatus(userId, newStatus, password);
      toast.success('Status updated successfully!');
      // Refresh the list
      const response = await getCollectors(password);
      setCollectors(response.data);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-shell">
        <form onSubmit={handlePasswordSubmit}>
          <div className="prompt-line">
            <span>C:\Users\Admin</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password and press Enter"
              autoFocus
            />
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Collector Management</h1>
      <div className="collectors-list">
        {collectors.map(collector => (
          <div key={collector._id} className="collector-card">
            <h4>{collector.username}</h4>
            <p><strong>Email:</strong> {collector.email}</p>
            <p><strong>SPCB No:</strong> {collector.spcb_authorization_number}</p>
            <p><strong>Status:</strong> <span className={`status-${collector.account_status.toLowerCase()}`}>{collector.account_status}</span></p>
            <div className="status-controls">
              <button onClick={() => handleStatusChange(collector._id, 'Approved')} className="btn-approve">Approve</button>
              <button onClick={() => handleStatusChange(collector._id, 'Pending')} className="btn-pending">Set Pending</button>
              <button onClick={() => handleStatusChange(collector._id, 'Rejected')} className="btn-reject">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;