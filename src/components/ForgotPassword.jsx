import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/forgotpassword.css';

function ForgotPassword() {
  const { role } = useParams();  // Capture the role from the URL
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseURL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch(`${baseURL}/request-password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setIsLoading(false);
        if (data.message === 'Password reset email sent successfully. Redirecting you to homepage in 5 seconds.') {
          // Delay the redirection by 5 seconds
          setTimeout(() => {
            navigate(`/`); // Redirect to the homepage
          }, 5000); // 5000 milliseconds = 5 seconds
        }
      })
      .catch(() => {
        setMessage('An error occurred. Please try again.');
        setIsLoading(false);
      });
  };

  return (
    <div className="container7">
      <form className='form7' onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className="form-group7">
          <label htmlFor="email">Email</label>
          <input className='input7'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
        <button className='button7' type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default ForgotPassword;
