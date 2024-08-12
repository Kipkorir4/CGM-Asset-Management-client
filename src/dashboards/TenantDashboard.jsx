import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaHistory, FaFlag } from 'react-icons/fa'; // Import Font Awesome icons
import '../styles/tenantdsh.css';

// TenantDashboard Component
function TenantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container09">
      <h1 className="dashboard-title09">Tenant Dashboard</h1>
      <div className="button-group09">
        <button className="action-button09" onClick={() => navigate('/tenant-dashboard/previous-complaints')}>
          <FaHistory style={{ marginRight: '10px' }} /> {/* History Icon */}
          Previous Complaints
        </button>
        <button className="action-button09" onClick={() => navigate('/tenant-dashboard/file-complaint')}>
          <FaFlag style={{ marginRight: '10px' }} /> {/* Flag Icon */}
          Report an Issue/Complaint
        </button>
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
    <div className="container6">
      <h1 className="complaints-title6">Previous Complaints</h1>
      <div className="search-bar6">
        <input className='input6'
          type="text"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>
      <div className="sort-buttons6">
        <p>Sort complaints by Status:</p>
        <button className='buton6' onClick={() => setStatusFilter('')}>All</button>
        <button className='buton6' onClick={() => setStatusFilter('Pending')}>Pending</button>
        <button className='buton6' onClick={() => setStatusFilter('Accepted')}>Accepted</button>
        <button className='buton6' onClick={() => setStatusFilter('Declined')}>Declined</button>
      </div>
      <table className="complaints-table6">
        <thead className='thead6'>
          <tr className='tr6'>
            <th className='th6'>Description</th>
            <th className='th6'>Category</th>
            <th className='th6'>Date</th>
            <th className='th6'>Status</th>
          </tr>
        </thead>
        <tbody className='tbody6'>
          {filteredComplaints.map(complaint => (
            <tr key={complaint.id} className="complaint-item6">
              <td className="complaint-description6">{complaint.description}</td>
              <td className="complaint-category6">{complaint.category}</td>
              <td className="complaint-date6">{complaint.date}</td>
              <td className="complaint-status6">{complaint.status}</td>
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
    <div className="card5">
      <h1 className="file-complaint-title5">File a Complaint</h1>
      <form className="complaint-form5" onSubmit={handleSubmit}>
        <div className="form-group5">
          <label htmlFor="category">Category</label>
          <select
            id="category5"
            className="form-control5"
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
        <div className="form-group5">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button5">Submit</button>
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
