// LandingPage.js
import React from "react";

const LandingPage = ({ onLogout }) => {
  return (
    <div>
      <h1>Welcome to Landing Page</h1>
      <button onClick={onLogout}>Logout</button> {/* Logout Button */}
    </div>
  );
};

export default LandingPage;
