import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className="login-page">
        <h1 className="login-title">Connect Alumni Portal</h1>
        <div className="login-container">
          
          {/* Student Section */}
          <div className="login-box">

          <h2>Student</h2>
            <img
              src="/image copy.png" // 🔁 Replace with actual logo path
              alt="Student Logo"
              className="login-logo"
            />
            
            <a href="/studentlogin"><button className="form-button">Student Login</button></a>
            <a href="/studentsignup"><button className="form-button">Student Signup</button></a>
          </div>

          {/* Alumni Section */}
          <div className="login-box">

            <h2>Alumni</h2>
            <img
              src="image.png" 
              alt="Alumni Logo"
              className="login-logo"
            />
            
            <a href="/aluminilogin"><button className="form-button">Alumni Login</button></a>
            <a href="/aluminisignup"><button className="form-button">Alumni Signup</button></a>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;
