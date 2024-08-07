import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";


function LandingPage() {
    const navigate = useNavigate();

    return (
      <div className="landing-page">
        <div id="landing-card-list">
          <div className="landing-card" onClick={() => navigate("/login/ceo")}>
            <h2>
              <AdminPanelSettingsIcon className="bank" /> CEO
            </h2>
          </div>
          <div
            className="landing-card"
            onClick={() => navigate("/login/finance-manager")}
          >
            <AccountBalanceIcon className="bank" />
            <h2>
              Finance <br />
              
            </h2>
          </div>
          <div
            className="landing-card"
            onClick={() => navigate("/login/procurement-manager")}
          >
            <AssignmentIcon className="bank" /> <br />
            <h2>Procurement <br /> </h2>
          </div>
          <div
            className="landing-card"
            onClick={() => navigate("/login/tenant")}
          >
            <HomeIcon className="bank" />
            <h2>Tenant</h2>
          </div>
        </div>
      </div>
    );
}

export default LandingPage;
