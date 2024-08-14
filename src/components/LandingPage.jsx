import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const getTimeOfDay = (hours) => {
    if (hours < 12) return 'morning';
    if (hours < 18) return 'afternoon';
    return 'evening';
};

const getDayOfWeek = (date) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
};

function LandingPage() {
    const navigate = useNavigate();
    const now = new Date();
    const hours = now.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const dayOfWeek = getDayOfWeek(now);
    const greetingMessage = `Good ${timeOfDay}!`;
    // Nice to see you this lovely ${dayOfWeek}.

    return (
        <>
            <h3 className='h30'>{greetingMessage} <br />Please click on your role to proceed.</h3>
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
        </>
    );
}

export default LandingPage;
