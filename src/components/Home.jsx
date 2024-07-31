import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home(){
  return (
    <div className="home-container">
      <div className="home">
        <Link to="/ceo-login" className="card">I am the CEO</Link>
        <Link to="/finance-manager-login" className="card">I am the Finance Manager</Link>
        <Link to="/procurement-manager-login" className="card">I am the Procurement Manager</Link>
        <Link to="/tenant-login" className="card">I am a Tenant</Link>
      </div>
    </div>
  );
};

export default Home;
