import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const { role } = useParams();

  function renderDashboardContent() {
    switch (role) {
      case 'ceo':
        return <h2>Welcome to the CEO Dashboard</h2>;
      case 'finance-manager':
        return <h2>Welcome to the Finance Manager Dashboard</h2>;
      case 'procurement-manager':
        return <h2>Welcome to the Procurement Manager Dashboard</h2>;
      case 'tenant':
        return <h2>Welcome to the Tenant Dashboard</h2>;
      default:
        return <h2>Welcome to the Dashboard</h2>;
    }
  }

  return (
    <div className="dashboard-container">
      {renderDashboardContent()}
    </div>
  );
}

export default Dashboard;
