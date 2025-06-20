// src/Student/Smenubar.jsx
import React from 'react';
import './Smenubar.css';

const Smenubar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>
      <ul>
        <li>Home</li>
        <a href='/sstudentdirectory'><li>Student Directory</li></a>
        <a href='/snetworkinghub'><li>Networking Hub</li></a>
        <a href='/sportaljob'><li>Portal Job</li></a>
        <a href='/sfeedback'><li>Feedback</li></a>
        <a href='/sreunion'><li>Reunion</li></a>
      </ul>
    </div>
  );
};

export default Smenubar;
