import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <div className="title-cards">
                <div className="card" onClick={() => navigate('/login/ceo')}>
                    <h2>I am the CEO</h2>
                </div>
                <div className="card" onClick={() => navigate('/login/finance-manager')}>
                    <h2>I am the Finance Manager</h2>
                </div>
                <div className="card" onClick={() => navigate('/login/procurement-manager')}>
                    <h2>I am the Procurement Manager</h2>
                </div>
                <div className="card" onClick={() => navigate('/login/tenant')}>
                    <h2>I am a Tenant</h2>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
