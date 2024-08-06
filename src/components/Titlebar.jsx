import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LogoutButton from '../dashboards/LogoutButton';
import '../styles/Titlebar.css';

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
      <h1 id='title' onClick={handleTitleClick}>
        CGM Properties
      </h1>
      {!isCentered && userRole && <LogoutButton />}
    </header>
  );
}

export default Titlebar;
