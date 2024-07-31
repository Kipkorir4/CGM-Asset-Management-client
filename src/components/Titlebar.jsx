import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Titlebar.css';

function Titlebar(){
  return (
    <header className="titlebar">
      <Link to="/" className="titlebar-link">
        <h1 id='title'>CGM Properties</h1>
      </Link>
    </header>
  );
};

export default Titlebar;
