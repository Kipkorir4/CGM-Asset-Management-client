import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CEODashboard from './dashboards/CEODashboard';
import TenantDashboard from './dashboards/TenantDashboard';
import FinanceDashboard from './dashboards/FinanceDashboard';
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
            <Route path="/ceo-dashboard" element={<CEODashboard />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
            <Route path="/finance-manager-dashboard" element={<FinanceDashboard />} />
            <Route path="/procurement-manager-dashboard" element={<ProcurementDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
