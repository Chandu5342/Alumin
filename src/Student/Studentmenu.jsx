import React, { useState } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './Studentmenu.css';
import Smenubar from './Smenubar';
import { useNavigate } from 'react-router-dom';
import jayaramImg from '../assets/jayaram.jpg';
import sanjayImg from '../assets/sanjay.jpg';
import pavanImg from '../assets/pavan.jpg';
import rameshImg from '../assets/ramesh.jpg';
import giriImg from '../assets/giri.jpg';
import raviImg from '../assets/ravi.jpg';

const Studentmenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const dummyAlumni = [
  { name: "jayaram", role: "CEO", company: "JC pvt lmt", photo: jayaramImg },
  { name: "sanjay", role: "Junior Chapri", company: "Bhoran", photo: sanjayImg },
  { name: "Pavan", role: "govt_job", company: "chepurukatta", photo: pavanImg },
  { name: "Ramesh", role: "manager", company: "JC pvt lmt", photo: rameshImg },
  { name: "giri", role: "senior chapri", company: "bhoran", photo: giriImg },
  { name: "Ravi", role: "senior bomb maker", company: "auto bomb", photo: raviImg },
];

  const handleLogout = () => {
    navigate('/studentlogin'); 
  };

  const handleEditProfile = () => {
    navigate('/editprofil'); // Navigate to Edit Profile page
  };

  return (
    <div className="student-dashboard">
      <Smenubar isOpen={showMenu} onClose={() => setShowMenu(false)} />

      {/* Navbar */}
      <header className="student-navbar">
        <FaBars className="nav-icon" onClick={() => setShowMenu(true)} />
        <div className="nav-title">Student Dashboard</div>
        <div className="profile-dropdown">
          <FaUserCircle
            className="nav-icon"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          />
          {showProfileDropdown && (
            <div className="dropdown-menu">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Alumni List */}
      <main className="student-main">
        <h2>All Registered Alumni</h2>
        <div className="alumni-list">
          {dummyAlumni.map((alum, idx) => (
            <div className="alumni-card" key={idx}>
              <img src={alum.photo} alt={alum.name} />
              <h3>{alum.name}</h3>
              <p><strong>Role:</strong> {alum.role}</p>
              <p><strong>Company:</strong> {alum.company}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Studentmenu;
