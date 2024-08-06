import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Login2.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { role } = useParams();  // Extract role from URL
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL

  console.log("Base URL", baseURL)


  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');  // Reset error message

    fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
      credentials: 'include', 
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))  // Handle status code
    .then(({ status, data }) => {
      if (status === 200) {
        // Save user role in sessionStorage
        sessionStorage.setItem('userRole', role);
        console.log('User Role', data.user.role);
        console.log('User ID', data.user.user_id);
        sessionStorage.setItem('user_id', data.user.user_id);

        // sessionStorage.setItem('user_id', user.ide);

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

  // Capitalize the first letter of each word, special case for CEO
  const formatRoleTitle = (role) => {
    if (role.toLowerCase() === 'ceo') return 'CEO';
    return role.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>{formatRoleTitle(role)} Login</h1>
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
