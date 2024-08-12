import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import './styles/ResetPassword.css'; // Make sure you have this CSS file for styling

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const baseURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        // Extract the token from the query parameters
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError('Invalid or missing reset token.');
        }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            setError('Reset token is missing.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        // Make a POST request to reset the password
        try {
            const response = await fetch(`${baseURL}/api/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,          // Pass the token
                    newPassword     // Pass the new password with the correct key
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const role = data.role; // Assuming the backend returns the role
                navigate(`/login/${role}`); // Adjust redirection as needed
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };


    return (
        <div className="reset-password-container">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
