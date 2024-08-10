import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../styles/tenantdsh.css";

// PreviousComplaints Component
function PreviousComplaints() {
  const [complaints, setComplaints] = useState([]);
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/complaints/${userId}`, {
      method: "GET",
      credentials: "include", // Include credentials in the request
    })
      .then((response) => response.json())
      .then((data) => setComplaints(data))
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [userId]);

  return (
    <div className="container">
      {/* <h1 className="complaints-title">Previous Complaints</h1>
      <ul className="complaints-list">
        {complaints.map(complaint => (
          <li key={complaint.id} className="complaint-item">
            <span className="complaint-description">{complaint.description}</span> - 
            <span className="complaint-category">{complaint.category}</span> - 
            <span className="complaint-date">{complaint.date}</span> - 
            <span className="complaint-status">{complaint.status}</span>
          </li>
        ))}
      </ul> */}
    </div>
  );
}

// FileComplaint Component
function FileComplaint() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("userId");
    fetch("http://127.0.0.1:5000/complaints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, category, description }),
      credentials: "include", // Include credentials in the request
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setCategory("");
          setDescription("");
          setMessage("Complaint filed successfully.");
        } else {
          setMessage(data.message);
        }
      })
      .catch(() => setMessage("An error occurred. Please try again."));
  };

  return (
    <div className="container">
      <h1 className="file-complaint-title">File a Complaint</h1>
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Water">Water</option>
            <option value="Electricity">Electricity</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="Fenestration">Fenestration</option>
            <option value="Paint">Paint</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

// TenantDashboardRoutes Component
function TenantDashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TenantDashboard />} />
      <Route path="previous-complaints" element={<PreviousComplaints />} />
      <Route path="file-complaint" element={<FileComplaint />} />
    </Routes>
  );
}

export default TenantDashboardRoutes;

// TenantDashboard Component
function TenantDashboard() {
  const navigate = useNavigate();

  return (
    <div className="tenant-dashoard">
      {/* <h1>This is the Tenant Dashboard</h1> */}

      <div id="tenant-card-container">
        <div
          className="tenant-card"
          onClick={() => navigate("/tenant-dashboard/previous-complaints")}
        >
          <h2>Previous Complaints</h2>
          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clock-history"
              viewBox="0 0 16 16"
            >
              <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
              <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
              <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
        </div>
        <div
          className="tenant-card"
          onClick={() => navigate("/tenant-dashboard/file-complaint")}
        >
          <h2>File Complaint?</h2>

          <button className="icon-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-flag"
              viewBox="0 0 16 16"
            >
              <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z" />
            </svg>
          </button>
        </div>
      </div>

      {/* <FileComplaint/> */}
    </div>
  );
}
