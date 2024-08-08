import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CEODashboardRoutes from './dashboards/CEODashboard'; // Updated import
import TenantDashboardRoutes from './dashboards/TenantDashboard'; // Updated import
import FinanceDashboardRoutes from './dashboards/FinanceDashboard'; // Updated import
import ProcurementDashboard from './dashboards/ProcurementDashboard';
import LandingPage from './components/LandingPage';
import Titlebar from './components/Titlebar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Titlebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/ceo-dashboard/*" element={<CEODashboardRoutes />} /> {/* Updated route */}
            <Route path="/tenant-dashboard/*" element={<TenantDashboardRoutes />} /> {/* Updated route */}
            <Route path="/finance-manager-dashboard/*" element={<FinanceDashboardRoutes />} /> {/* Updated route */}
            <Route path="/procurement-manager-dashboard/*" element={<ProcurementDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
