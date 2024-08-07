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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState({ tenants: 1, procurementManagers: 1, financeManagers: 1 });

  useEffect(() => {
    const fetchData = async (type, setter, page) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/users/${type}?page=${page}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching data: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const { data, totalPages } = await response.json();
        setter(data);
        setTotalPages(prev => ({ ...prev, [type]: totalPages }));
      } catch (error) {
        setError(error.message);
        console.error('Request failed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData('tenant', setTenants, currentPage);
    fetchData('procurement-manager', setProcurementManagers, currentPage);
    fetchData('finance-manager', setFinanceManagers, currentPage);
  }, [currentPage]);

  const handlePageChange = (type, page) => {
    setCurrentPage(page);
    fetchData(type, setTenants, page); // Adjust this line to fetch data for the correct type
  };

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="container">
      <h1 className="title">View CGM Affiliates</h1>
      <section>
        <h2>Tenants</h2>
        {tenants.length > 0 ? (
          <>
            <ul className="list">
              {tenants.map((tenant) => (
                <li key={tenant.id} className="list-item">
                  {tenant.username} - {tenant.role}
                </li>
              ))}
            </ul>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages.tenants} 
              onPageChange={(page) => handlePageChange('tenant', page)} 
            />
          </>
        ) : (
          <p className="no-data">No tenants available</p>
        )}
      </section>
      <section>
        <h2>Procurement Managers</h2>
        {procurementManagers.length > 0 ? (
          <>
            <ul className="list">
              {procurementManagers.map((pm) => (
                <li key={pm.id} className="list-item">
                  {pm.username} - {pm.role}
                </li>
              ))}
            </ul>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages.procurementManagers} 
              onPageChange={(page) => handlePageChange('procurement-manager', page)} 
            />
          </>
        ) : (
          <p className="no-data">No procurement managers available</p>
        )}
      </section>
      <section>
        <h2>Finance Managers</h2>
        {financeManagers.length > 0 ? (
          <>
            <ul className="list">
              {financeManagers.map((fm) => (
                <li key={fm.id} className="list-item">
                  {fm.username} - {fm.role}
                </li>
              ))}
            </ul>
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages.financeManagers} 
              onPageChange={(page) => handlePageChange('finance-manager', page)} 
            />
          </>
        ) : (
          <p className="no-data">No finance managers available</p>
        )}
      </section>
    </div>
  );
}

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={index + 1 === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

// ViewComplaints Component
function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

        if (!token) {
          throw new Error('No auth token found');
        }

        const response = await fetch('http://127.0.0.1:5000/all-complaints', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching data: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching complaints:', error);
        setComplaints([]); // Set complaints to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

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
    fetch('http://127.0.0.1:5000/enroll', {
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
