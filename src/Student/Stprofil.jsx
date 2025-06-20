import React, { useState } from 'react';
import './Stprofil.css';
import { useNavigate } from 'react-router-dom';

const Stprofil = () => {
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens or session logic here if any
    navigate('/'); // Redirect to main dashboard or login
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
    setEditing(false);
  };

  return (
    <div className="stprofil-container">
      {!editing ? (
        <div className="profile-menu">
          <button onClick={handleEditClick}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="edit-form" onSubmit={handleFormSubmit}>
          <h2>Edit Profile</h2>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Branch" required />
          <input type="text" placeholder="Graduation Year" required />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default Stprofil;
