import React, { useState } from 'react';
import './Alumnisignup.css';

const Alumnisignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    regdNumber: '',
    collegeName: '',
    batch: '',
    currentRole: '',
    companyName: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.placeholder]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData['Confirm Password']) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch('https://aluminiserver.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData['Full Name'],
          email: formData['Email'],
          password: formData['Password'],
          regdNumber: formData['Regd Number'],
          collegeName: formData['College Name'],
          batch: formData['Batch (e.g., 2018–2022)'],
          currentRole: formData['Role (e.g., Developer)'],
          companyName: formData['Company Name'],
          typeOfUser: 'alumni'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Registration failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = '/aldashboard';
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="alumni-signup-container">
      <h1>Alumni Signup</h1>

      <form className="alumni-signup-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" placeholder="Password" required onChange={handleChange} />
        <input type="password" placeholder="Confirm Password" required onChange={handleChange} />
        <input type="text" placeholder="Regd Number" required onChange={handleChange} />
        <input type="text" placeholder="College Name" required onChange={handleChange} />
        <input type="text" placeholder="Batch (e.g., 2018–2022)" required onChange={handleChange} />
        <input type="text" placeholder="Role (e.g., Developer)" required onChange={handleChange} />
        <input type="text" placeholder="Company Name" required onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Alumnisignup;
