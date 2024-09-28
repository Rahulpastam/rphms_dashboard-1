/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === "Admin") {
      navigate("/login");
    } else if (role === "Doctor") {
      navigate("/doctorlogin");
    }
  };

  return (
    <>
      <div className="role-selection-container">
        <div className="logo-section">
          <img src="logo.png" alt="Website Logo" className="website-logo" />
        </div>
        <h1 className="title">WELCOME TO RP HOSPITAL MANAGEMENT SYSTEM</h1>
        <div className="roles-container">
          <div className="role-section">
            <img src="admin11.png" alt="Admin Logo" className="role-image" />
            <button
              onClick={() => handleRoleSelection("Admin")}
              className="role-button"
            >
              Login as Admin
            </button>
          </div>
          <div className="role-section">
            <img src="doc.png" alt="Doctor Logo" className="role-image" />
            <button
              onClick={() => handleRoleSelection("Doctor")}
              className="role-button"
            >
              Login as Doctor
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoleSelection;
