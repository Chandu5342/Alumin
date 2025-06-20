import React from 'react';
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = ({ isOpen, onClose }) => {
  return (
    <div className={`menu-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>×</button>
      <ul>
        <a href='/aldashboard'><li>Home</li></a>
        <a href='/studentdirectory'><li>Student Directory</li></a>
        <a href='networkinghub'><li>Networking Hub</li></a>
        <a href='portaljob'><li>Portal Job</li></a>
        <a href='reunion'><li>Reunion</li></a>
        <a href='feedback'><li>Feedback</li></a>
      </ul>
    </div>
  );
};

export default Menu;
