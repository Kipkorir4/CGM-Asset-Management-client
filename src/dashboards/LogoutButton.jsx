import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/logout');
      sessionStorage.removeItem('userRole'); // Use sessionStorage
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
