import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../styles/FinanceDashboard.css';

function FinanceDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [complaintNumber, setComplaintNumber] = useState('');
  const [allocationAmount, setAllocationAmount] = useState('');
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/accepted-complaints?page=${currentPage}&limit=${complaintsPerPage}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setComplaints(data.complaints);
        setTotalComplaints(data.total);
      })
      .catch(error => console.error('Error fetching complaints:', error));
  }, [baseURL, currentPage, complaintsPerPage]);

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

  const totalPages = Math.ceil(totalComplaints / complaintsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className='main11'>
      <h2 className='h211'>Finance Manager Dashboard</h2>
      <div className='button-container11'>
        <button className="view-allocated-button11" onClick={() => navigate('allocated-complaints')}>
          Approved Allocations
        </button>
        <button className="view-balances-button11" onClick={() => navigate('current-budget-balances')}>
          Budget Balances
        </button>
      </div>
      <div className="dashboard-container11">
        <div className="content11">
          <div className="table-container11">
            <table className='table11'>
              <thead className='thead11'>
                <tr className='tr11'>
                  <th className='th11'>Complaint Number</th>
                  <th className='th11'>Complaint Category</th>
                  <th className='th11'>Amount Allocated</th>
                  <th className='th11'>Allocation Status</th>
                  <th className='th11'>Decline</th>
                </tr>
              </thead>
              <tbody className='tbody11'>
                {complaints.length > 0 ? (
                  complaints.map(complaint => (
                    <tr key={complaint.id} className='tr11'>
                      <td className='td11'>{complaint.complaintNumber}</td>
                      <td className='td11'>{complaint.category}</td>
                      <td className='td11'>{complaint.amountAllocated || '-'}</td>
                      <td className='td11'>{complaint.amountAllocated ? 'Allocated' : 'Unallocated'}</td>
                      <td className='td11'>
                        <button onClick={() => handleDecline(complaint.id)} className='button11'>Insufficient</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className='tr11'>
                    <td colSpan="6" className='td11'>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="pagination11">
            <button onClick={handlePreviousPage} disabled={currentPage === 1} className='button11'>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className='button11'>Next</button>
          </div>

          <div className="form-container11">
            <form
              className='form11'
              onSubmit={(e) => {
                e.preventDefault();
                handleAllocate();
              }}
            >
              <div className="form-group11">
                <h4>Allocation Form</h4>
                <label htmlFor="complaintNumber" className='label11'> Complaint Number</label>
                <input
                  className='input11'
                  type="text"
                  id="complaintNumber11"
                  value={complaintNumber}
                  onChange={(e) => setComplaintNumber(e.target.value)}
                  required
                  placeholder="Enter Complaint Number..."
                />
              </div>
              <div className="form-group11">
                <label htmlFor="allocationAmount" className='label11'>Allocation Amount</label>
                <input
                  className='input11'
                  type="number"
                  id="allocationAmount11"
                  value={allocationAmount}
                  onChange={(e) => setAllocationAmount(e.target.value)}
                  required
                  placeholder="Enter amount to allocate..."
                />
              </div>
              <button className='button111' type="submit">Allocate</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// approved allocations route
function AllocatedComplaints() {
  const [allocatedComplaints, setAllocatedComplaints] = useState([]);
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(10);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/allocated-complaints?page=${currentPage}&limit=${complaintsPerPage}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setAllocatedComplaints(data.complaints);
        setTotalComplaints(data.total);
      })
      .catch(error => console.error('Error fetching approved complaints:', error));
  }, [baseURL, currentPage, complaintsPerPage]);

  const totalPages = Math.ceil(totalComplaints / complaintsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="allocated-complaints-container11">
      <h1>Approved Allocations</h1>
      <div className="table-container11">
        <table className='table11'>
          <thead className='thead11'>
            <tr className='tr11'>
              <th className='th11'>Category</th>
              <th className='th11'>Complaint Number</th>
              <th className='th11'>Amount Allocated</th>
            </tr>
          </thead>
          <tbody className='tbody11'>
            {allocatedComplaints.length > 0 ? (
              allocatedComplaints.map((complaint, index) => (
                <tr key={index} className='tr11'>
                  <td className='td11'>{complaint.category}</td>
                  <td className='td11'>{complaint.complaint_number}</td>
                  <td className='td11'>{complaint.amount_allocated}</td>
                </tr>
              ))
            ) : (
              <tr className='tr11'>
                <td colSpan="3" className='td11'>No allocated complaints available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination11">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='button11'>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='button11'>Next</button>
      </div>
    </div>
  );
}

// current budgrt balances route
function CurrentBudgetBalances() {
  const [balances, setBalances] = useState([]);
  const [totalBalances, setTotalBalances] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [balancesPerPage] = useState(10);
  const baseURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${baseURL}/current-budget-balances?page=${currentPage}&limit=${balancesPerPage}`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setBalances(data.balances);
        setTotalBalances(data.total);
      })
      .catch(error => console.error('Error fetching budget balances:', error));
  }, [baseURL, currentPage, balancesPerPage]);

  const totalPages = Math.ceil(totalBalances / balancesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <div className="current-budget-balances-container11">
      <h1>Current Budget Balances</h1>
      <div className="table-container11">
        <table className='table11'>
          <thead className='thead11'>
            <tr className='tr11'>
              <th className='th11'>Category</th>
              <th className='th11'>Balance Amount</th>
            </tr>
          </thead>
          <tbody className='tbody11'>
            {balances.length > 0 ? (
              balances.map((balance, index) => (
                <tr key={index} className='tr11'>
                  <td className='td11'>{balance.category}</td>
                  <td className='td11'>{balance.balance_amount}</td>
                </tr>
              ))
            ) : (
              <tr className='tr11'>
                <td colSpan="2" className='td11'>No budget balances available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination11">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className='button11'>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className='button11'>Next</button>
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
