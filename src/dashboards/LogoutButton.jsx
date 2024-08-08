import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LogoutButton.css';

function LogoutButton() {
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleLogout = async () => {
    try {
      await axios.post(`${baseURL}/logout`);
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
