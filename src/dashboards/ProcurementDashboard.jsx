import React, { useEffect, useState } from 'react';
import '../styles/ProcurementDashboard.css';

function ProcurementDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [perPage] = useState(10); // Number of complaints per page
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchComplaints();
  }, [currentPage]);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${baseURL}/fetch_all_complaints?page=${currentPage}&per_page=${perPage}`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data.complaints);
      setTotalCount(data.total_count);
      setFilteredComplaints(data.complaints);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAction = async (complaintId, action) => {
    try {
      const response = await fetch(`${baseURL}/complaints/${complaintId}/${action}`, {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        fetchComplaints(); // Re-fetch complaints to update the list
      } else {
        console.error('Error handling complaint action:', await response.json());
      }
    } catch (error) {
      console.error('Error handling complaint action:', error);
    }
  };

  const handleFilterChange = (status) => {
    const filtered = complaints.filter((complaint) =>
      status ? complaint.status === status : true
    );
    setFilteredComplaints(filtered);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    const filtered = complaints.filter((complaint) =>
      complaint.category.toLowerCase().includes(value)
    );
    setFilteredComplaints(filtered);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="dashboard-container">
      <h2>Procurement Manager Dashboard</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search complaints by category..."
          value={filter}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>

      <div className="filter-buttons">
        <h4>Sort complaints:</h4>
        <button onClick={() => handleFilterChange('')}>All</button>
        <button onClick={() => handleFilterChange('Accepted')}>Accepted</button>
        <button onClick={() => handleFilterChange('Declined')}>Declined</button>
      </div>
      <div className="complaints-container">
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Tenant</th>
              <th>Complaint Number</th>
              <th>Category</th>
              <th>Description</th>
              <th>Date Filed</th>
              <th>Image</th> {/* New column for image */}
              <th>Actions/Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">No complaints available</td>
              </tr>
            ) : (
              filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.tenant}</td>
                  <td>{complaint.complaint_number}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.date}</td>
                  <td className="complaint-image">
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
                  <td>
                    {complaint.status === 'Accepted' ? (
                      <button className="accepted-button" disabled>Accepted</button>
                    ) : complaint.status === 'Declined' ? (
                      <button className="declined-button" disabled>Declined</button>
                    ) : (
                      <>
                        <button onClick={() => handleAction(complaint.id, 'accept')} className="accept-button">
                          Accept
                        </button>
                        <button onClick={() => handleAction(complaint.id, 'decline')} className="decline-button">
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button
          className="pagination-button65"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="pagination-button65"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ProcurementDashboard;
