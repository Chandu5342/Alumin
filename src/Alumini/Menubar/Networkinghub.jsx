import React, { useState, useEffect } from 'react';
import './Networkinghub.css';
import axios from 'axios';
import TopNavbar from './TopNavbar';

const API = 'https://aluminiserver.onrender.com/api/groups';

const Networkinghub = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [groupPurpose, setGroupPurpose] = useState('');
  const [messageText, setMessageText] = useState({});
  const [showMsgBox, setShowMsgBox] = useState({});

  const user = JSON.parse(localStorage.getItem('user')); // Alumni user from localStorage

  // Fetch groups created by alumni
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${API}/alumni/${user.id}`); // Note: user.id not _id
      setGroups(res.data);
    } catch (err) {
      console.error('Failed to load groups:', err.message);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchGroups();
    }
  }, []);

  // Toggle form display
  const toggleAddForm = () => setShowAddForm(prev => !prev);

  // Create a group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!groupName.trim() || !groupPurpose.trim()) return;

    try {
      await axios.post(`${API}/create`, {
        groupName,
        groupPurpose,
        createdBy: user.id,
      });
      setGroupName('');
      setGroupPurpose('');
      setShowAddForm(false);
      fetchGroups();
    } catch (err) {
      console.error('Error creating group:', err.message);
    }
  };

  // Delete a group
  const handleDeleteGroup = async (groupId) => {
    try {
      await axios.delete(`${API}/${groupId}`);
      fetchGroups();
    } catch (err) {
      console.error('Error deleting group:', err.message);
    }
  };

  // Send message to group
  const handleSendMessage = async (groupId, groupName) => {
    const message = messageText[groupId];
    if (!message?.trim()) return alert("Please enter a message!");

    try {
      await axios.post(`${API}/${groupId}/message`, {
        sender: user.id,
        text: message
      });
      alert(`Message sent to "${groupName}"`);
      setMessageText(prev => ({ ...prev, [groupId]: '' }));
      setShowMsgBox(prev => ({ ...prev, [groupId]: false }));
    } catch (err) {
      console.error('Error sending message:', err.message);
    }
  };

  return (
    <>
      <TopNavbar></TopNavbar>
    <div className="networkinghub-container">
      
    
      {/* Left: Add Group Form */}
      <div className="section">
        <h3>Manage Groups</h3>
        <button onClick={toggleAddForm}>
          {showAddForm ? 'Close Form' : 'Add Group'}
        </button>

        {showAddForm && (
          <form onSubmit={handleCreateGroup}>
            <label>Group Name:</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
            <label>Group Purpose:</label>
            <input
              type="text"
              value={groupPurpose}
              onChange={(e) => setGroupPurpose(e.target.value)}
              required
            />
            <button type="submit">Create</button>
          </form>
        )}
      </div>

      {/* Right: Group List */}
      <div className="section">
        <h3>My Groups</h3>
        {groups.length === 0 ? (
          <p className="no-groups">No groups created yet.</p>
        ) : (
          <ul>
            {groups.map(group => (
              <li key={group._id} className="group-item">
                <div className="group-info">
                  <strong>{group.groupName}</strong>
                  <small>{group.groupPurpose}</small>
                </div>
                <div className="group-meta">
                  <span><strong>Members:</strong> {group.members?.length || 0}</span>
                  <span><strong>Created:</strong> {new Date(group.createdAt).toLocaleDateString()}</span>
                </div>

                {showMsgBox[group._id] && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="text"
                      value={messageText[group._id] || ''}
                      onChange={(e) => setMessageText(prev => ({
                        ...prev,
                        [group._id]: e.target.value
                      }))}
                      placeholder="Type your message..."
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        marginBottom: '10px'
                      }}
                    />
                    <button
                      className="message-btn"
                      onClick={() => handleSendMessage(group._id, group.groupName)}
                    >
                      Send
                    </button>
                  </div>
                )}

                <div className="group-actions">
                  <button
                    className="message-btn"
                    onClick={() => setShowMsgBox(prev => ({
                      ...prev,
                      [group._id]: !prev[group._id]
                    }))}
                  >
                    {showMsgBox[group._id] ? 'Cancel' : 'Message'}
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteGroup(group._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
};

export default Networkinghub;
