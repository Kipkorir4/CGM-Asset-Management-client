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
        <button className="action-button09" onClick={() => navigate('/tenant-dashboard/file-complaint')}>
          <FaFlag style={{ marginRight: '10px' }} /> {/* Flag Icon */}
          Report an Issue/Complaint
        </button>
        <button className="action-button09" onClick={() => navigate('/tenant-dashboard/previous-complaints')}>
          <FaHistory style={{ marginRight: '10px' }} /> {/* History Icon */}
          Previous Complaints/Issues
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const userId = sessionStorage.getItem('user_id');
  const baseURL = import.meta.env.VITE_API_URL;
  const perPage = 10;

  const fetchComplaints = (page) => {
    fetch(`${baseURL}/complaints/${userId}?page=${page}&per_page=${perPage}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setComplaints(data.complaints);
        setFilteredComplaints(data.complaints);
        setTotalPages(data.total_pages);
        setCurrentPage(data.current_page);
      })
      .catch(error => console.error('Error fetching complaints:', error));
  };

  useEffect(() => {
    fetchComplaints(currentPage);
  }, [currentPage, userId, baseURL]);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container6">
      <h1 className="complaints-title6">Previous Complaints/Issues</h1>
      <div className="search-bar6">
        <input
          type="text"
          className="input6"
          placeholder="Search by category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
      </div>
      <div className="filter-buttons">
        <p className="sortmsg">Sort complaints by Status:</p>
        <button className="buton6" onClick={() => setStatusFilter('')}>All</button>
        <button className="buton6" onClick={() => setStatusFilter('Pending')}>Pending</button>
        <button className="buton6" onClick={() => setStatusFilter('Accepted')}>Accepted</button>
        <button className="buton6" onClick={() => setStatusFilter('Declined')}>Declined</button>
      </div>
      <table className="complaints-table6">
        <thead className="thead6">
          <tr className="tr6">
            <th className="th6">Description</th>
            <th className="th6">Category</th>
            <th className="th6">Date</th>
            <th className="th6">Status</th>
            <th className="th6">Image</th>
          </tr>
        </thead>
        <tbody className="tbody6">
          {filteredComplaints.map(complaint => (
            <tr key={complaint.id} className="complaint-item6">
              <td className="complaint-description6">{complaint.description}</td>
              <td className="complaint-category6">{complaint.category}</td>
              <td className="complaint-date6">{complaint.date}</td>
              <td className="complaint-status6">{complaint.status}</td>
              <td className="complaint-image6">
                {complaint.image_url ? (
                  <a href={complaint.image_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={complaint.image_url}
                      alt={`Complaint Image ${complaint.id}`}
                      style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                  </a>
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination6">
        <button className="pagination-button6" onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pagination-info6">
          Page {currentPage} of {totalPages}
        </span>
        <button className="pagination-button6" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}


// FileComplaint Component
function FileComplaint() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);  // New state for image
  const [message, setMessage] = useState('');
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem('user_id');
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('category', category);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    fetch(`${baseURL}/complaints`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setCategory('');
          setDescription('');
          setImage(null);
          setMessage('Complaint filed successfully.');
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage('An error occurred. Please try again.'));
  };

  return (
    <div className="card5">
      <h1 className="file-complaint-title5">File a Complaint/Issue</h1>
      <form className="complaint-form5" onSubmit={handleSubmit}>
        <div className="form-group5">
          <label htmlFor="category" className='label5'>Category</label>
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
          <label htmlFor="description" className='label5'>Description</label>
          <textarea
            id="description"
            className="form-control5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group5">
          <label htmlFor="image" className='label5'>Upload Image </label>
          <input
            type="file"
            id="image"
            className="form-control5"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
          />
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
