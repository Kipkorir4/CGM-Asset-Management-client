import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import "../styles/LandingPage.css";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HomeIcon from "@mui/icons-material/Home";

const getTimeOfDay = (hours) => {
  if (hours < 12) return "morning";
  if (hours < 18) return "afternoon";
  return "evening";
};

const getDayOfWeek = (date) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
};

function LandingPage() {
  const navigate = useNavigate();
  const now = new Date();
  const hours = now.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const dayOfWeek = getDayOfWeek(now);
  const greetingMessage = `Good ${timeOfDay}!`;

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const timeOfDay = getTimeOfDay(hours);
    const dayOfWeek = getDayOfWeek(now);
    const greetingMessage = `Good ${timeOfDay}, Happy ${dayOfWeek}!`;

    renderToast(greetingMessage);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const renderToast = (message) => {
    toast.success(greetingMessage, {
      id: "toast-0", // Unique toast key
      title: "Welcome to CEODashboard!",
      description: "Please select your role to proceed.",
      duration: 5000,
      style: {
        border: "1px solid #4CAF50",
        padding: "16px",
        color: "#4CAF50",
      },
      position: "top-center",
    });
  };

  return (
    <>
      {/* <h3 className="h30">
        {greetingMessage} <br />
        Please click on your role to proceed.
      </h3> */}
      <Toaster
        width="80%"
        toastKey="toast-0"
        type="success"
        duration={5000}
        // style={{

        //   color: "#4CAF50",
        //   position: "fixed",
        //   top: "20%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        //   borderRadius: "5px",
        //   boxShadow: "0 30px 30px 0px",
        // }}
        position="top-center"
      />

      <div className="landing-page0">
        <div className="title-cards0">
          <div className="card0" onClick={() => navigate("/login/ceo")}>
            <h2>
              <AdminPanelSettingsIcon className="bank" /> CEO
            </h2>
          </div>
          <div
            className="card0"
            onClick={() => navigate("/login/finance-manager")}
          >
            <AccountBalanceIcon className="bank" />
            <h2> Finance Manager</h2>
          </div>
          <div
            className="card0"
            onClick={() => navigate("/login/procurement-manager")}
          >
            <AssignmentIcon className="bank" />
            <h2> Procurement Manager</h2>
          </div>
          <div className="card0" onClick={() => navigate("/login/tenant")}>
            <HomeIcon className="bank" />
            <h2>Tenant</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
