import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Profil.css';

const Profil = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("alumniUser");
    navigate('/aluminilogin');
  };

  const toggleEditForm = () => {
    setShowEditForm(true);
    setShowMenu(false);
  };

  return (
    <div className="profile-container">
      <FaUserCircle size={28} onClick={() => setShowMenu(!showMenu)} className="profile-icon" />

      {showMenu && (
        <div className="profile-menu">
          <button onClick={toggleEditForm}>Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {showEditForm && (
        <div className="profile-edit-form">
          <h3>Edit Alumni Info</h3>
          <form>
            <input type="text" placeholder="Full Name" defaultValue="John Doe" />
            <input type="email" placeholder="Email" defaultValue="john@example.com" />
            <input type="text" placeholder="Role" defaultValue="Software Engineer" />
            <input type="text" placeholder="Company" defaultValue="Google" />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profil;
