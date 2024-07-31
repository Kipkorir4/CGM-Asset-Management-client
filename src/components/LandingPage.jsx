import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>CGM Properties</h1>
            <div className="title-cards">
                <button onClick={() => navigate('/login/ceo')}>I am the CEO</button>
                <button onClick={() => navigate('/login/finance-manager')}>I am the Finance Manager</button>
                <button onClick={() => navigate('/login/procurement-manager')}>I am the Procurement Manager</button>
                <button onClick={() => navigate('/login/tenant')}>I am a Tenant</button>
            </div>
        </div>
    );
}

export default LandingPage;
