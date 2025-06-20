import React, { useState } from 'react';
import './Studentlogin.css'; // Reuse existing CSS

const Studentsignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    regdNumber: '',
    collegeName: '',
    batch: '',
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
          batch: formData['Batch (e.g., 2022–2026)'],
          typeOfUser: 'student'
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Registration failed");
        return;
      }

      // Save to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to student menu
      window.location.href = '/studentmenu';

    } catch (err) {
      console.error("Signup Error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="student-login-container">
      <h1>Student Portal</h1>
      <form className="student-login-form" onSubmit={handleSubmit}>
        <h2>Student Signup</h2>
        <input type="text" placeholder="Full Name" required onChange={handleChange} />
        <input type="email" placeholder="Email" required onChange={handleChange} />
        <input type="password" placeholder="Password" required onChange={handleChange} />
        <input type="password" placeholder="Confirm Password" required onChange={handleChange} />
        <input type="text" placeholder="Regd Number" required onChange={handleChange} />
        <input type="text" placeholder="College Name" required onChange={handleChange} />
        <input type="text" placeholder="Batch (e.g., 2022–2026)" required onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Studentsignup;
