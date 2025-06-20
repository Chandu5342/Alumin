import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="left-section">
          <img src="http://127.0.0.1:5500/images/logo.jpg" alt="Logo" className="logo" />
          <h1 className="title">Connect Alumini</h1>
        </div>
        <div className="right-section">
          <button className="login-button">Admin Login</button>
          <a href='/login'><button className="login-button">User Login</button></a>
        </div>
      </div>

      <div className="dashboard-tagline">
        Connect, Grow, and Success with Comprehensive Alumnexus
      </div>
    </div>
  );
};

export default Dashboard;
