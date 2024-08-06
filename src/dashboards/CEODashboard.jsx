import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/tenantdsh.css';

// CEODashboard Component
function CEODashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="dashboard-title">CEO Dashboard</h1>
      <div className="button-group">
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/view-cgm-affiliates')}>View CGM Affiliates</button>
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/view-complaints')}>View Complaints</button>
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/enrollment-page')}>Enrollment Page</button>
      </div>
    </div>
  );
}

// ViewCGMAffiliates Component
function ViewCGMAffiliates() {
  const [tenants, setTenants] = useState([]);
  const [procurementManagers, setProcurementManagers] = useState([]);
  const [financeManagers, setFinanceManagers] = useState([]);

  useEffect(() => {
    const fetchData = async (type, setter) => {
      try {
        const response = await fetch(`https://cgm-asset-management-server.onrender.com/users/${type}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData('tenant', setTenants);
    fetchData('procurement-manager', setProcurementManagers);
    fetchData('finance-manager', setFinanceManagers);
  }, []);

  return (
    <div className="container">
      <h1 className="title">View CGM Affiliates</h1>
      <h2>Tenants</h2>
      <ul className="list">
        {tenants.map((tenant) => (
          <li key={tenant.id} className="list-item">
            {tenant.username} - {tenant.role}
          </li>
        ))}
      </ul>
      <h2>Procurement Managers</h2>
      <ul className="list">
        {procurementManagers.map((pm) => (
          <li key={pm.id} className="list-item">
            {pm.username} - {pm.role}
          </li>
        ))}
      </ul>
      <h2>Finance Managers</h2>
      <ul className="list">
        {financeManagers.map((fm) => (
          <li key={fm.id} className="list-item">
            {fm.username} - {fm.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ViewComplaints Component
function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch('https://cgm-asset-management-server.onrender.com/all-complaints')
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error('Error fetching complaints:', error));
  }, []);

  return (
    <div className="container">
      <h1 className="title">View Complaints</h1>
      <ul className="complaints-list">
        {complaints.map((complaint) => (
          <li key={complaint.complaint_number} className="complaint-item">
            {complaint.tenant} - {complaint.category} - {complaint.description} - {complaint.status} - {complaint.amount_allocated || 0}
          </li>
        ))}
      </ul>
    </div>
  );
}

// EnrollmentPage Component
function EnrollmentPage() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://cgm-asset-management-server.onrender.com/enroll', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, username, password }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('An error occurred. Please try again.'));
  };

  return (
    <div className="container">
      <h1 className="title">Enrollment Page</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="role">User Type</label>
          <select
            id="role"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select User Type</option>
            <option value="tenant">Tenant</option>
            <option value="procurement-manager">Procurement Manager</option>
            <option value="finance-manager">Finance Manager</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create User</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

// CEODashboardRoutes Component
function CEODashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CEODashboard />} />
      <Route path="view-cgm-affiliates" element={<ViewCGMAffiliates />} />
      <Route path="view-complaints" element={<ViewComplaints />} />
      <Route path="enrollment-page" element={<EnrollmentPage />} />
    </Routes>
  );
}

export default CEODashboardRoutes;
