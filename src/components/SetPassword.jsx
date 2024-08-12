import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/setpass.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons

function SetPassword() {
  const { role, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    fetch(`${baseURL}/reset_password/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        if (data.message === 'Your password has been updated successfully') {
          navigate(`/login/${role}`); // Redirect to role-specific login page
        }
        setIsLoading(false);
      })
      .catch(() => {
        setMessage('An error occurred. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <div className="container2">
      <form className="form2" onSubmit={handleSubmit}>
        <h1 className="title2">Set Your Password</h1>
        <div className="form-group2">
          <label htmlFor="new-password">New Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="new-password"
              className="form-control2"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <span
              className="password-eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <div className="form-group2">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              className="form-control2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              className="password-eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>
        <button type="submit" className="submit-button2" disabled={isLoading}>
          {isLoading ? 'Setting...' : 'Set Password'}
        </button>
        {message && <p className={`message2 ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
}

export default SetPassword;
