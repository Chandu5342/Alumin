import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Aluminilogin.css';

const Aluminilogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://aluminiserver.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.msg || "Login failed");
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.typeOfUser === 'alumni') {
        navigate('/aldashboard');
      } else {
        alert("Invalid user type for this portal");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="alumini-login-container">
      <h1>Alumni Portal</h1>

      <form className="alumini-login-form" onSubmit={handleLogin}>
        <h2>Alumni Login</h2>
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

export default Aluminilogin;
