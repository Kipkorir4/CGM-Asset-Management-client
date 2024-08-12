import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Importing eye icons
import '../styles/Login2.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { role } = useParams();
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    fetch(`${baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, role }),
      credentials: 'include',
    })
    .then(response => response.json().then(data => ({ status: response.status, data })))
    .then(({ status, data }) => {
      if (status === 200) {
        sessionStorage.setItem('userRole', role);
        sessionStorage.setItem('user_id', data.user.user_id);

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

  const handleForgotPassword = () => {
    navigate(`/forgot-password/`);
  };

  const formatRoleTitle = (role) => {
    if (role.toLowerCase() === 'ceo') return 'CEO';
    return role.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="login-container8">
      <form onSubmit={handleSubmit} className="login-form8">
        <h1>{formatRoleTitle(role)} Login</h1>
        <div>
          <label className='label8' htmlFor="username">Username</label>
          <input className='logininput8'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="password-container">
          <label className='label8' htmlFor="password">Password</label>
          <div className="password-input-container">
            <input className='logininput8'
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <p className="forgot-password8" onClick={handleForgotPassword}>Forgot Password?</p>
      </form>
    </div>
  );
}

export default Login;
