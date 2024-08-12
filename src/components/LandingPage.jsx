import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page0">
            <div className="title-cards0">
                <div className="card0" onClick={() => navigate('/login/ceo')}>
                    <h2>I am the CEO</h2>
                </div>
                <div className="card0" onClick={() => navigate('/login/finance-manager')}>
                    <h2>I am the Finance Manager</h2>
                </div>
                <div className="card0" onClick={() => navigate('/login/procurement-manager')}>
                    <h2>I am the Procurement Manager</h2>
                </div>
                <div className="card0" onClick={() => navigate('/login/tenant')}>
                    <h2>I am a Tenant</h2>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
