import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Titlebar.css';

function Titlebar() {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    const userRole = sessionStorage.getItem('userRole'); // Use sessionStorage
    if (userRole) {
      switch (userRole.toLowerCase().replace(' ', '-')) {
        case 'ceo':
          navigate('/ceo-dashboard');
          break;
        case 'tenant':
          navigate('/tenant-dashboard');
          break;
        case 'finance-manager':
          navigate('/finance-dashboard');
          break;
        case 'procurement-manager':
          navigate('/procurement-dashboard');
          break;
        default:
          navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  return (
    <header className="titlebar" onClick={handleTitleClick}>
      <h1 id='title'>CGM Properties</h1>
    </header>
  );
}

export default Titlebar;
