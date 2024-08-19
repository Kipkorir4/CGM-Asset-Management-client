import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaUsers, FaTools, FaUserPlus } from 'react-icons/fa';
import '../styles/CEODashboard.css';

// CEODashboard Component
function CEODashboard() {
  const navigate = useNavigate();

  return (
    <div className="container444">
      <h1 className="dashboard-title44">CEO Dashboard</h1>
      <div className="button-group444">
        <button className="action-button444" onClick={() => navigate('/ceo-dashboard/view-cgm-affiliates')}>
          <FaUsers style={{ marginRight: '8px' }} /> View CGM Affiliates
        </button>
        <button className="action-button444" onClick={() => navigate('/ceo-dashboard/view-complaints')}>
          <FaTools style={{ marginRight: '8px' }} /> View Assets Info
        </button>
        <button className="action-button444" onClick={() => navigate('/ceo-dashboard/enrollment-page')}>
          <FaUserPlus style={{ marginRight: '8px' }} /> Enroll a User
        </button>
      </div>
    </div>
  ); 
}

// ViewCGMAffiliates Component
function ViewCGMAffiliates() {
  const [affiliates, setAffiliates] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
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

  function capitalizeName(name) {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }

  function formatRole(role) {
    if (role === 'CEO') {
      return role.toUpperCase();
    }
    return role
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ');
  }

  // Filter affiliates based on search query
  const filteredAffiliates = affiliates.filter(affiliate =>
    affiliate.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container41">
      <h1 className="title41">CGM Affiliates/Users</h1>
      <input
        type="text"
        placeholder="Search user by username..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar41" // Add this class for styling if needed
      />
      <table className="table41">
        <thead className='thead41'>
          <tr className='tr41'>
            <th>#</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className='tbody41'>
          {filteredAffiliates.length === 0 ? (
            <tr className='tr41'>
              <td colSpan="3" className="empty-message41">No affiliates found</td>
            </tr>
          ) : (
            filteredAffiliates.map((affiliate, index) => (
              <tr key={index} className='tr41'>
                <td>{(page - 1) * 10 + index + 1}</td> {/* Calculate the row number */}
                <td>{capitalizeName(affiliate.username)}</td>
                <td>{formatRole(affiliate.role)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination-controls41">
        <button className='button44' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className='button44' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
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
    <div className="container44">
      <h1 className="title44">Assets Issues/Complaints Information</h1>
      <div className="sort-controls44">
        <button className='sortbuttons44' onClick={() => handleSortChange('Allocated')}>Sort by Allocated</button>
        <button className='sortbuttons44' onClick={() => handleSortChange('Unallocated')}>Sort by Unallocated</button>
        <button className='sortbuttons44' onClick={() => handleSortChange('Pending')}>Sort by Pending</button>
        <button className='sortbuttons44' onClick={() => handleSortChange(null)}>Clear Sort</button>
      </div>
      <table className="complaints-table44">
        <thead className='thead44'>
          <tr className='tr44'>
            <th>Tenant</th>
            <th>Category</th>
            <th>Description</th>
            <th>Allocation Status</th>
            <th>Amount Allocated</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className='tbody44'>
          {complaints.map((complaint) => (
            <tr className='tr44' key={complaint.complaint_number}>
              <td>{complaint.tenant}</td>
              <td>{complaint.category}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>{complaint.amount_allocated || 0}</td>
              <td>
                {complaint.image_url ? (
                  <a href={complaint.image_url} target="_blank" rel="noopener noreferrer">
                    <img src={complaint.image_url} alt={`Complaint ${complaint.complaint_number}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  </a>
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls44">
        <button className='button44' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className='button44' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
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
    <div className="container42">
      <form className="form42" onSubmit={handleSubmit}>
        <h1 className="title42">Enrollment Form</h1>
        <div className="form-group42">
          <label htmlFor="role">User Type</label>
          <select
            id="role42"
            className="form-control42"
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
        <div className="form-group42">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username42"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter username for the new user..."
          />
        </div>
        <div className="form-group42">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email42"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email to send set-password link..."
          />
        </div>
        <div className="submit-button-container">
          <button type="submit" className="submit-button42">Enroll User</button>
        </div>
        {message && <p className="message42">{message}</p>}
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
