import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/FinanceDashboard.css';

function FinanceDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [complaintNumber, setComplaintNumber] = useState('');
  const [allocationAmount, setAllocationAmount] = useState('');
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/accepted-complaints`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setComplaints(data))
      .catch(error => console.error('Error fetching complaints:', error));
  }, [baseURL]);

  const handleAllocate = () => {
    const complaint = complaints.find(c => c.complaintNumber === complaintNumber);
    if (!complaint) {
      alert('Invalid Complaint Number');
      return;
    }

    fetch(`${baseURL}/allocate_budget/${complaint.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: parseInt(allocationAmount, 10) }),
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setComplaints(prevComplaints => prevComplaints.map(c => {
            if (c.id === complaint.id) {
              return { ...c, amountAllocated: allocationAmount, allocationStatus: 'Allocated' };
            }
            return c;
          }));
          alert(`Complaint ${data.complaint_number} was allocated a budget of ${allocationAmount}`);
        } else {
          alert(data.message);
        }
      })
      .catch(error => console.error('Error allocating budget:', error));
  };

  const handleDecline = (complaintId) => {
    fetch(`${baseURL}/decline-complaint/${complaintId}`, {
      method: 'POST',
      credentials: 'include',
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
      <h2>Finance Manager Dashboard</h2>
      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Complaint Number</th>
                <th>Complaint Category</th>
                <th>Budget Balance</th>
                <th>Amount Allocated</th>
                <th>Allocation Status</th>
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
                    <td>{complaint.amountAllocated ? 'Allocated' : 'Unallocated'}</td>
                    <td>
                      <button onClick={() => handleDecline(complaint.id)}>Decline</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="form-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAllocate();
            }}
          >
            <div className="form-group">
              <h4>Allocation Form</h4>
              <label htmlFor="complaintNumber"></label>
              <input
                type="text"
                id="complaintNumber"
                value={complaintNumber}
                onChange={(e) => setComplaintNumber(e.target.value)}
                required
                placeholder="Enter Complaint Number..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="allocationAmount"></label>
              <input
                type="number"
                id="allocationAmount"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)}
                required
                placeholder="Enter amount to allocate..."
              />
            </div>
            <button type="submit">Allocate</button>
          </form>
          <button className="view-allocated-button" onClick={() => navigate('allocated-complaints')}>
            Approved Allocations
          </button>
          <button className="view-balances-button" onClick={() => navigate('current-budget-balances')}>
            Budget Balances
          </button>
        </div>
      </div>
    </div>
  );
}

function AllocatedComplaints() {
  const [allocatedComplaints, setAllocatedComplaints] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/allocated-complaints`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setAllocatedComplaints(data))
      .catch(error => console.error('Error fetching approved complaints:', error));
  }, [baseURL]);

  return (
    <div className="allocated-complaints-container">
      <h1>Approved Allocations</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Complaint Number</th>
              <th>Amount Allocated</th>
            </tr>
          </thead>
          <tbody>
            {allocatedComplaints.length > 0 ? (
              allocatedComplaints.map((complaint, index) => (
                <tr key={index}>
                  <td>{complaint.category}</td>
                  <td>{complaint.complaint_number}</td>
                  <td>{complaint.amount_allocated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No allocated complaints available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CurrentBudgetBalances() {
  const [balances, setBalances] = useState([]);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/current-budget-balances`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setBalances(data))
      .catch(error => console.error('Error fetching budget balances:', error));
  }, [baseURL]);

  return (
    <div className="current-budget-balances-container">
      <h1>Current Budget Balances</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Balance Amount</th>
            </tr>
          </thead>
          <tbody>
            {balances.length > 0 ? (
              balances.map((balance, index) => (
                <tr key={index}>
                  <td>{balance.category}</td>
                  <td>{balance.balance_amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No budget balances available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FinanceDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<FinanceDashboard />} />
      <Route path="allocated-complaints" element={<AllocatedComplaints />} />
      <Route path="current-budget-balances" element={<CurrentBudgetBalances />} />
    </Routes>
  );
}

export default FinanceDashboardRoutes;
