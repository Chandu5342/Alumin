import React, { useState } from 'react';
import './Studentdirectory.css';

const dummyAlumni = [
  { id: 1, name: "John Doe", role: "Software Engineer", company: "Google", email: "john@example.com" },
  { id: 2, name: "Jane Smith", role: "Data Scientist", company: "Microsoft", email: "jane@example.com" },
  { id: 3, name: "Rahul Kumar", role: "DevOps Engineer", company: "Amazon", email: "rahul@example.com" },
];

const Studentdirectory = () => {
  const [selectedAlum, setSelectedAlum] = useState(null);
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');
  
  // Store messages for each alumni by their id
  // Format: { alumniId: [{text: 'message', timestamp: Date}, ...], ... }
  const [messagesByAlumni, setMessagesByAlumni] = useState({});

  const handleSendMessage = () => {
    if (message.trim() && selectedAlum) {
      // Add message to the corresponding alumni's message array
      setMessagesByAlumni(prev => {
        const prevMessages = prev[selectedAlum.id] || [];
        return {
          ...prev,
          [selectedAlum.id]: [...prevMessages, { text: message.trim(), timestamp: new Date() }]
        };
      });

      setConfirmation(`Message sent to ${selectedAlum.name}`);
      setMessage('');
    }
  };

  return (
    <div className="student-directory-container">
      <h2>Connect with Alumni</h2>

      <div className="alumni-list">
        {dummyAlumni.map(alum => (
          <div
            key={alum.id}
            className={`alumni-card ${selectedAlum?.id === alum.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedAlum(alum);
              setConfirmation('');
              setMessage('');
            }}
          >
            <h3>{alum.name}</h3>
            <p><strong>Role:</strong> {alum.role}</p>
            <p><strong>Company:</strong> {alum.company}</p>
          </div>
        ))}
      </div>

      {selectedAlum && (
        <div className="message-box">
          <h3>Message to {selectedAlum.name}</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            rows={4}
          />
          <button onClick={handleSendMessage}>Send</button>
          {confirmation && <p className="confirmation">{confirmation}</p>}

          {/* Display message history for selected alumni */}
          <div className="message-history">
            <h4>Message History:</h4>
            {(messagesByAlumni[selectedAlum.id] || []).length === 0 && (
              <p>No messages sent yet.</p>
            )}
            <ul>
              {(messagesByAlumni[selectedAlum.id] || []).map((msg, idx) => (
                <li key={idx}>
                  <span>{msg.text}</span> <br />
                  <small>{msg.timestamp.toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Studentdirectory;
