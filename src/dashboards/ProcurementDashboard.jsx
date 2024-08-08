import React, { useEffect, useState } from 'react';
import '../styles/ProcurementDashboard.css';

function ProcurementDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState('');
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${baseURL}/fetch_all_complaints`, {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data);
      setFilteredComplaints(data);
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
        setComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === complaintId
              ? { ...complaint, status: action === 'accept' ? 'Accepted' : 'Declined' }
              : complaint
          )
        );
        setFilteredComplaints((prevComplaints) =>
          prevComplaints.map((complaint) =>
            complaint.id === complaintId
              ? { ...complaint, status: action === 'accept' ? 'Accepted' : 'Declined' }
              : complaint
          )
        );
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
              <th>Actions/Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No complaints available</td>
              </tr>
            ) : (
              filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>{complaint.tenant}</td>
                  <td>{complaint.complaint_number}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.description}</td>
                  <td>{complaint.date}</td>
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
    </div>
  );
}

export default ProcurementDashboard;
