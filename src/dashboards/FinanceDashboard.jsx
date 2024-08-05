import React, { useState, useEffect } from 'react';
import '../styles/FinanceDashboard.css';

function FinanceDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [allocationAmount, setAllocationAmount] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/accepted-complaints', {
      method: 'GET',
      credentials: 'include', // Include credentials in the request
    })
      .then(response => response.json())
      .then(data => setComplaints(data))
      .catch(error => console.error('Error fetching complaints:', error));
  }, []);

  const handleAllocate = (complaintId) => {
    fetch(`http://127.0.0.1:5000/allocate-budget/${complaintId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: allocationAmount }),
      credentials: 'include', // Include credentials in the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setComplaints(prevComplaints => prevComplaints.map(c => {
            if (c.id === complaintId) {
              return { ...c, amountAllocated: allocationAmount };
            }
            return c;
          }));
          alert(`This complaint ${data.complaint_number} was allocated a budget of ${allocationAmount}`);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error allocating budget:', error));
  };

  const handleDecline = (complaintId) => {
    fetch(`http://127.0.0.1:5000/decline-complaint/${complaintId}`, {
      method: 'POST',
      credentials: 'include', // Include credentials in the request
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setComplaints(prevComplaints => prevComplaints.filter(c => c.id !== complaintId));
          alert(`Complaint ${complaintId} has been declined.`);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error declining complaint:', error));
  };

  return (
    <div className="dashboard-container">
      <h1>Finance Manager Dashboard</h1>
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Complaint Number</th>
                <th>Complaint Category</th>
                <th>Budget Balance</th>
                <th>Amount Allocated</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {complaints.length > 0 ? (
                complaints.map(complaint => (
                  <tr key={complaint.id}>
                    <td>{complaint.complaintNumber}</td>
                    <td>{complaint.category}</td>
                    <td>{complaint.budgetBalance}</td>
                    <td>{complaint.amountAllocated || '-'}</td>
                    <td>
                      <button onClick={() => handleDecline(complaint.id)}>Decline</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="form-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAllocate(allocationAmount);
            }}
          >
            <div className="form-group">
              <label htmlFor="allocationAmount">Allocation Amount</label>
              <input
                type="number"
                id="allocationAmount"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)}
                required
              />
            </div>
            <button type="submit">Allocate</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FinanceDashboard;
