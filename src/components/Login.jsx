import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Login2.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { role } = useParams();  // Extract role from URL
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  // Reset error message

    fetch('http://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))  // Handle status code
    .then(({ status, data }) => {
      if (status === 200) {
        // Save user role in sessionStorage
        sessionStorage.setItem('userRole', role);

        // Navigate to the appropriate dashboard based on the role
        const rolePath = role.toLowerCase().replace(' ', '-');
        navigate(`/${rolePath}-dashboard`);
      } else {
        setError(data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    });
  };

  return (
    <div>
      <h1>{role.replace('-', ' ')} Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
