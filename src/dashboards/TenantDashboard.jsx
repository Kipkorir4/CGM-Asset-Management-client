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
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchCategory, setSearchCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const userId = sessionStorage.getItem('user_id');
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/complaints/${userId}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setComplaints(data);
        setFilteredComplaints(data);
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, [userId, baseURL]);

  useEffect(() => {
    let filtered = complaints;

    if (searchCategory) {
      filtered = filtered.filter(complaint =>
        complaint.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(complaint => complaint.status === statusFilter);
    }

    setFilteredComplaints(filtered);
  }, [searchCategory, statusFilter, complaints]);

  return (
    <div className="container">
      <h1 className="complaints-title">Previous Complaints</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>
      <div className="sort-buttons">
        <p>Sort complaints by Status:</p>
        <button onClick={() => setStatusFilter('')}>All</button>
        <button onClick={() => setStatusFilter('Pending')}>Pending</button>
        <button onClick={() => setStatusFilter('Accepted')}>Accepted</button>
        <button onClick={() => setStatusFilter('Declined')}>Declined</button>
      </div>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map(complaint => (
            <tr key={complaint.id} className="complaint-item">
              <td className="complaint-description">{complaint.description}</td>
              <td className="complaint-category">{complaint.category}</td>
              <td className="complaint-date">{complaint.date}</td>
              <td className="complaint-status">{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// FileComplaint Component
function FileComplaint() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');

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
    <div className="card">
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
