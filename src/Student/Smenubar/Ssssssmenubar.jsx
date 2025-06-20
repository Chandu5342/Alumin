// src/Student/Smenubar.jsx
import React from 'react';
import './Smenubar.css';

const Smenubar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <ul>
        <li>Home</li>
        <li>Student Directory</li>
        <li>Networking Hub</li>
        <li>Portal Job</li>
        <li>Feedback</li>
        <li>Reunion</li>
      </ul>
    </div>
  );
};

export default Smenubar;
