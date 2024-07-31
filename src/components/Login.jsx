import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login2.css';

function Login({ role }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    function handleSubmit(e) {
      e.preventDefault();
  
      fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.message.startsWith('Welcome')) {
          navigate(`/${role.toLowerCase().replace(' ', '-')}-dashboard`);
        } else {
          setError(data.message);
        }
      })
      .catch(() => {
        setError('An error occurred. Please try again.');
      });
    }
  
    return (
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{role} Login</h2>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
  
  export default Login;
