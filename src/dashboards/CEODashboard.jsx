import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
// import '../styles/CEODashboard.css';

// CEODashboard Component
function CEODashboard() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="dashboard-title">CEO Dashboard</h1>
      <div className="button-group">
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/view-cgm-affiliates')}>View CGM Affiliates</button>
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/view-complaints')}>View Assets Repaired/Replaced (or to be)</button>
        <button className="action-button" onClick={() => navigate('/ceo-dashboard/enrollment-page')}>Enroll a User</button>
      </div>
    </div>
  );
}

// ViewCGMAffiliates Component
function ViewCGMAffiliates() {
  const [affiliates, setAffiliates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/all-users?page=${page}&per_page=10`);
        const data = await response.json();
        setAffiliates(data.users);
        setTotalPages(data.total_pages); // Use the total_pages from the response
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container1">
      <h1 className="title1">View CGM Affiliates</h1>
      <table className="table1">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.length === 0 ? (
            <tr>
              <td colSpan="3" className="empty-message">No affiliates found</td>
            </tr>
          ) : (
            affiliates.map((affiliate, index) => (
              <tr key={index}>
                <td>{(page - 1) * 10 + index + 1}</td> {/* Calculate the row number */}
                <td>{affiliate.username}</td>
                <td>{affiliate.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}



// ViewComplaints Component
function ViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortStatus, setSortStatus] = useState(null); // Use null to indicate no sorting
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/all-complaints?page=${page}&per_page=10`)
      .then((response) => response.json())
      .then((data) => {
        const sortedComplaints = sortComplaints(data.complaints, sortStatus);
        setComplaints(sortedComplaints);
        setTotalPages(data.total_pages); // Use the total_pages from the response
      })
      .catch((error) => console.error('Error fetching complaints:', error));
  }, [page, sortStatus]);

  const sortComplaints = (complaints, status) => {
    if (!status) return complaints; // Return unsorted complaints if no status is selected

    return [...complaints].filter((complaint) => complaint.status === status);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSortChange = (status) => {
    setSortStatus(status);
  };

  return (
    <div className="container">
      <h1 className="title">Assets Repaired/Replaced</h1>
      <div className="sort-controls">
        <button onClick={() => handleSortChange('Allocated')}>Sort by Allocated</button>
        <button onClick={() => handleSortChange('Insufficient Funds')}>Sort by Insufficient Funds</button>
        <button onClick={() => handleSortChange('Pending')}>Sort by Pending</button>
        <button onClick={() => handleSortChange(null)}>Clear Sort</button> {/* Button to clear sorting */}
      </div>
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Tenant</th>
            <th>Category</th>
            <th>Description</th>
            <th>Allocation Status</th>
            <th>Amount Allocated</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.complaint_number}>
              <td>{complaint.tenant}</td>
              <td>{complaint.category}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{complaint.amount_allocated || 0}</td>
              <td>
                {complaint.image_url ? (
                  <img src={complaint.image_url} alt={`Complaint ${complaint.complaint_number}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
// EnrollmentPage Component
function EnrollmentPage() {
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${baseURL}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role, username, email }),
    })
      .then((response) => response.json().then(data => ({ status: response.status, body: data })))
      .then(({ status, body }) => {
        setMessage(body.message);
        if (status === 201) {
          // Remain on the same page, simply display the success message
          setRole('');
          setUsername('');
          setEmail('');
        }
      })
      .catch(() => setMessage('An error occurred. Please try again.'));
  };

  return (
    <div className="container">
      <h1 className="title">Enrollment Form</h1>
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
            placeholder="Enter username for the new user..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email to send set-password link..."
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
