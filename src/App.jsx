import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CEODashboardRoutes from './dashboards/CEODashboard';
import TenantDashboardRoutes from './dashboards/TenantDashboard';
import FinanceDashboardRoutes from './dashboards/FinanceDashboard';
import ProcurementDashboard from './dashboards/ProcurementDashboard';
import LandingPage from './components/LandingPage';
import Titlebar from './components/Titlebar';
import Footer from './components/Footer';
import SetPassword from './components/SetPassword';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';  // Import the new component
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
            <Route path="/ceo-dashboard/*" element={<CEODashboardRoutes />} />
            <Route path="/tenant-dashboard/*" element={<TenantDashboardRoutes />} />
            <Route path="/finance-manager-dashboard/*" element={<FinanceDashboardRoutes />} />
            <Route path="/procurement-manager-dashboard/*" element={<ProcurementDashboard />} />
            <Route path="/:role/reset_password/:token" element={<SetPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />  {/* Add route for ResetPassword component */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
