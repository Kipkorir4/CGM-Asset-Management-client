import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../dashboards/LogoutButton';
import '../styles/Titlebar.css';
import logo from '../assets/cgm.jpg'; // Adjust path to your logo

function Titlebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = sessionStorage.getItem('userRole');

  const handleTitleClick = () => {
    if (userRole) {
      switch (userRole.toLowerCase().replace(' ', '-')) {
        case 'ceo':
          navigate('/ceo-dashboard');
          break;
        case 'tenant':
          navigate('/tenant-dashboard');
          break;
        case 'finance-manager':
          navigate('/finance-manager-dashboard');
          break;
        case 'procurement-manager':
          navigate('/procurement-manager-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const isCentered = location.pathname === '/' || location.pathname.startsWith('/login');

  return (
    <header className={`titlebar ${isCentered ? 'centered' : 'dashboard'}`}>
      <div className="logo-container" onClick={handleTitleClick}>
        <img src={logo} alt="Logo" className="logo" />
        {!isCentered && <h1 className="title-left">CGM Properties</h1>}
      </div>
      {isCentered && <h1 className="title-center" onClick={handleTitleClick}>CGM Properties</h1>}
      {!isCentered && userRole && <LogoutButton />}
    </header>
  );
}

export default Titlebar;
