import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Titlebar from './components/Titlebar';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      {/* <Titlebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ceo-login" element={<Login role="CEO" />} />
        <Route path="/finance-manager-login" element={<Login role="Finance Manager" />} />
        <Route path="/procurement-manager-login" element={<Login role="Procurement Manager" />} />
        <Route path="/tenant-login" element={<Login role="Tenant" />} />
        {/* Define routes for dashboards with role parameter */}
        <Route path="/:role-dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;