import React, { useState } from 'react';
import './Snetworkinghug.css';

const Snetworkinghug = () => {
  // Sample alumni groups data
  const alumniGroups = [
    { id: 1, name: "Google Developers", description: "Group for Google Alumni" },
    { id: 2, name: "Microsoft AI Club", description: "Microsoft Alumni focused on AI" },
    { id: 3, name: "Amazon Cloud Team", description: "Amazon Alumni Cloud Experts" },
  ];

  // State to track which groups student has joined
  const [joinedGroups, setJoinedGroups] = useState([]);

  // Join a group
  const handleAddGroup = (groupId) => {
    if (!joinedGroups.includes(groupId)) {
      setJoinedGroups([...joinedGroups, groupId]);
      alert(`You joined the group successfully!`);
      // TODO: Add backend logic to register user in this group
    }
  };

  // Exit a group
  const handleExitGroup = (groupId) => {
    setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    alert(`You left the group.`);
    // TODO: Add backend logic to unregister user from this group
  };

  return (
    <div className="networkinghub-container">
      <h2>Alumni Groups</h2>
      <div className="groups-list">
        {alumniGroups.map(group => {
          const isJoined = joinedGroups.includes(group.id);
          return (
            <div key={group.id} className="group-card">
              <h3>{group.name}</h3>
              <p>{group.description}</p>
              {isJoined ? (
                <button className="exit-btn" onClick={() => handleExitGroup(group.id)}>Exit Group</button>
              ) : (
                <button className="add-btn" onClick={() => handleAddGroup(group.id)}>Add Group</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Snetworkinghug;
