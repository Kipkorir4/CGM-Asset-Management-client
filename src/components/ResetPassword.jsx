import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ResetPassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    const toggleShowNewPassword = () => {
        setShowNewPassword(prevState => !prevState);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    return (
        <div className="reset-password-container00">
            <form onSubmit={handleSubmit} className='form00'>
                <h2>Reset Your Password</h2>
                <div className="form-group00">
                    <label className='label00' htmlFor="newPassword">New Password</label>
                    <div className="password-input-container">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword00"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="input00"
                        />
                        <span onClick={toggleShowNewPassword} className="password-eye-icon">
                            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                <div className="form-group00">
                    <label className='label00' htmlFor="confirmPassword">Confirm New Password</label>
                    <div className="password-input-container">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword00"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input00"
                        />
                        <span onClick={toggleShowConfirmPassword} className="password-eye-icon">
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>
                {error && <p className="error00">{error}</p>}
                <button className='button00' type="submit">Reset Password</button>
            </form>
        </div>
    );
}

export default ResetPassword;
