import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/tenantdsh.css';

// TenantDashboard Component
function TenantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">      
      <h1 className="dashboard-title">Tenant Dashboard</h1>
      <div className="button-group">
        <button className="action-button" onClick={() => navigate('/tenant-dashboard/previous-complaints')}>Previous Complaints</button>
        <button className="action-button" onClick={() => navigate('/tenant-dashboard/file-complaint')}>File a Complaint</button>
      </div>      
    </div>
  );
}

// PreviousComplaints Component
function PreviousComplaints() {
  const [complaints, setComplaints] = useState([]);
  const userId = sessionStorage.getItem('user_id');
  const baseURL = import.meta.env.VITE_API_URL

  console.log("userId: ", userId)

  useEffect(() => {
    fetch(`${baseURL}/complaints/${userId}`, {
      method: 'GET',
      credentials: 'include', // Include credentials in the request
    })
      .then(response => response.json())
      .then(data => setComplaints(data))
      .catch(error => console.error('Error fetching complaints:', error));
  }, [userId]);

  console.log("complaints", complaints)

  return (
    <div className="container">
      <h1 className="complaints-title">Previous Complaints</h1>
      <ul className="complaints-list">
        {complaints.map(complaint => (
          <li key={complaint.id} className="complaint-item">
            <span className="complaint-description">{complaint.description}</span> - 
            <span className="complaint-category">{complaint.category}</span> - 
            <span className="complaint-date">{complaint.date}</span> - 
            <span className="complaint-status">{complaint.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// FileComplaint Component
function FileComplaint() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = import.meta.env.VITE_API_URL

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');

    console.log('Sending', userId)
    fetch(`${baseURL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, category, description }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCategory('');
          setDescription('');
          setMessage('Complaint filed successfully.');
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage('An error occurred. Please try again.'));
  };

  return (
    <div className="container">
      <h1 className="file-complaint-title">File a Complaint</h1>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="Fenestration">Fenestration</option>
            <option value="Paint">Paint</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

// TenantDashboardRoutes Component
function TenantDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TenantDashboard />} />
      <Route path="previous-complaints" element={<PreviousComplaints />} />
      <Route path="file-complaint" element={<FileComplaint />} />
    </Routes>
  );
}

export default TenantDashboardRoutes;
