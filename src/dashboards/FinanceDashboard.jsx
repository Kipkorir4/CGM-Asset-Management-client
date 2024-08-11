import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComplaints, allocateBudget, declineComplaint } from './actions/complaintActions';
import '../styles/FinanceDashboard.css';

function FinanceDashboard() {
  const dispatch = useDispatch();
  const { complaints, loading, error } = useSelector(state => state);
  const [allocationAmount, setAllocationAmount] = React.useState('');

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  const handleAllocate = (complaintId) => {
    dispatch(allocateBudget(complaintId, allocationAmount));
    alert(`Complaint ${complaintId} was allocated a budget of ${allocationAmount}`);
  };

  const handleDecline = (complaintId) => {
    dispatch(declineComplaint(complaintId));
    alert(`Complaint ${complaintId} has been declined.`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
              handleAllocate(complaints[0]?.id); // Adjust according to your logic
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
