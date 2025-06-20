import React, { useState } from 'react';
import './Studentlogin.css';
import { useNavigate } from 'react-router-dom';

const Studentlogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://aluminiserver.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
     console.log(data.user.typeOfUser);
      if (data.user.typeOfUser === 'student') {
        navigate('/studentmenu');
      } else {
        alert("Invalid user type");
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="student-login-container">
      <h1>Student Portal</h1>
      <form className="student-login-form" onSubmit={handleSubmit}>
        <h2>Student Login</h2>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Studentlogin;
