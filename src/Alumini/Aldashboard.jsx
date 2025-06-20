import React, { useState, useEffect } from 'react';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import './AlDashboard.css';
import Profil from './Profil';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TopNavbar from './Menubar/TopNavbar';

const AlDashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const [studentRequests, setStudentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData?.typeOfUser !== 'alumni') {
      navigate('/aluminilogin');
    } else {
      setUser(userData);

      // 🟡 Fetch dashboard data
      fetchStats(userData.id);
      fetchRequests(userData.id);
    }
  }, [navigate]);

  const fetchStats = async (id) => {
    try {
      const res = await axios.get(`https://aluminiserver.onrender.com/api/alumni/stats/${id}`);
      setStats(res.data);
    } catch (err) {
      console.error("Stats fetch error:", err);
    }
  };

  const fetchRequests = async (id) => {
    try {
      const res = await axios.get(`https://aluminiserver.onrender.com/api/alumni/requests/${id}`);
      setStudentRequests(res.data);
    } catch (err) {
      console.error("Requests fetch error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/aluminilogin');
  };

  return (
    <div className="al-dashboard">
      

      {/* Top Navbar */}
      <TopNavbar></TopNavbar>

      {/* Dashboard Content */}
      <main className="al-main">
        <div className="al-main-flex">
          {/* Left Section: Welcome + Profile */}
          <div className="welcome-box">
            {user && (
              <>
                <h2>Welcome, {user.fullName} 👋</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Company:</strong> {user.companyName}</p>
                <p><strong>Role:</strong> {user.currentRole}</p>
                <p><strong>Batch:</strong> {user.batch}</p>
                <p><strong>College:</strong> {user.collegeName}</p>
              </>
            )}
          </div>

          {/* Right Section: Network Card */}
          <div className="alumni-network-card">
            <h3>Alumni Network</h3>
            <p><strong>Followers:</strong> {stats.followers || 0}</p>
            <p><strong>Pending Requests:</strong> {stats.pendingRequests || 0}</p>
            <p><strong>Jobs Posted:</strong> {stats.jobsPosted || 0}</p>
            <p><strong>Groups Joined:</strong> {stats.groupcreated || 0}</p> {/* We'll do this later */}
          </div>
        </div>

        {/* Student Requests */}
        <h2 style={{ marginTop: '2rem' }}>Student Requests</h2>
        <div className="alumni-grid">
          {studentRequests.length > 0 ? (
            studentRequests.map((req, idx) => (
              <div key={idx} className="student-card">
                <h3>{req.studentId.fullName}</h3>
                <p><strong>Email:</strong> {req.studentId.email}</p>
                <p><strong>Batch:</strong> {req.studentId.batch}</p>
                <button>View Profile</button>
                <button>Accept</button>
              </div>
            ))
          ) : (
            <p>No student requests at the moment.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AlDashboard;
