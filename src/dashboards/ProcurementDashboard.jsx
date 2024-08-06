import React, { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import '../styles/ProcurementDashboard.css';

function ProcurementDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/complaints', {
        credentials: 'include',
      });
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const handleAction = async (complaintId, action) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/complaints/${complaintId}/${action}`, {
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
      } else {
        console.error('Error handling complaint action:', await response.json());
      }
    } catch (error) {
      console.error('Error handling complaint action:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Procurement Manager Dashboard</h2>
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
            {complaints.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">No complaints available</td>
              </tr>
            ) : (
              complaints.map((complaint) => (
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
