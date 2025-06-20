import React, { useState } from 'react';
import './Sreunion.css';

const Sreunion = () => {
  // Dummy reunion meetings created by alumni
  const [reunions, setReunions] = useState([
    { id: 1, title: "Annual Alumni Meet 2024", date: "2024-07-15", createdBy: "John Doe", joined: false },
    { id: 2, title: "Tech Networking Session", date: "2024-08-01", createdBy: "Jane Smith", joined: false },
    { id: 3, title: "Career Guidance Webinar", date: "2024-09-10", createdBy: "Rahul Kumar", joined: false },
  ]);

  // Join reunion handler
  const joinReunion = (id) => {
    setReunions(reunions.map(r => r.id === id ? { ...r, joined: true } : r));
    alert("You joined the reunion!");
  };

  // Exit reunion handler
  const exitReunion = (id) => {
    setReunions(reunions.map(r => r.id === id ? { ...r, joined: false } : r));
    alert("You exited the reunion.");
  };

  return (
    <div className="reunion-container">
      <h2>Alumni Reunion Meetings</h2>
      {reunions.length === 0 ? (
        <p>No reunions scheduled.</p>
      ) : (
        <ul className="reunion-list">
          {reunions.map(reunion => (
            <li key={reunion.id} className="reunion-card">
              <h3>{reunion.title}</h3>
              <p><strong>Date:</strong> {reunion.date}</p>
              <p><strong>Created by:</strong> {reunion.createdBy}</p>
              <div className="reunion-actions">
                {!reunion.joined ? (
                  <button className="join-btn" onClick={() => joinReunion(reunion.id)}>Join Reunion</button>
                ) : (
                  <button className="exit-btn" onClick={() => exitReunion(reunion.id)}>Exit</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sreunion;