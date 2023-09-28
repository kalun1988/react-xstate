// LoginForm.js
import React, { useState } from "react";

const LoginForm = ({ onLogin, error }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, otp });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        OTP:
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}{" "}
      {/* Displaying error here */}
    </form>
  );
};

export default LoginForm;
