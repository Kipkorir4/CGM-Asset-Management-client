import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CEODashboardRoutes from './dashboards/CEODashboard'; // Updated import
import TenantDashboardRoutes from './dashboards/TenantDashboard'; // Updated import
import FinanceDashboard from './dashboards/FinanceDashboard';
import ProcurementDashboard from './dashboards/ProcurementDashboard';
import LandingPage from './components/LandingPage';
import Titlebar from './components/Titlebar';
import Footer from './components/Footer';
import './styles/App.css';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <App />
    <Router>
      <div className="app">
        <Titlebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login/:role" element={<Login />} />
            <Route path="/ceo-dashboard/*" element={<CEODashboardRoutes />} /> {/* Updated route */}
            <Route path="/tenant-dashboard/*" element={<TenantDashboardRoutes />} /> {/* Updated route */}
            <Route path="/finance-manager-dashboard/*" element={<FinanceDashboard />} />
            <Route path="/procurement-manager-dashboard/*" element={<ProcurementDashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
    </Provider>
  );
}

export default App;
