import React, { useState } from 'react';
import './Reunion.css';

const Reunion = () => {
  const [plans, setPlans] = useState([
    {
      id: 1,
      date: '2025-08-15',
      location: 'City Hall',
      description: 'Annual alumni reunion with dinner and speeches.',
    },
  ]);
  const [showForm, setShowForm] = useState(false);

  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !location.trim() || !description.trim()) {
      alert('Please fill all fields.');
      return;
    }
    const newPlan = {
      id: Date.now(),
      date,
      location: location.trim(),
      description: description.trim(),
    };
    setPlans((prev) => [newPlan, ...prev]);
    setDate('');
    setLocation('');
    setDescription('');
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
  };

  return (
    <div className="reunion-container">
      <div className="top-button-wrapper">
        <button className="add-btn" onClick={toggleForm}>
          {showForm ? 'Close' : 'Add Reunion'}
        </button>
      </div>

      {showForm && (
        <form className="reunion-form" onSubmit={handleSubmit}>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location"
              required
            />
          </label>
          <label>
            Description:
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description"
              required
            />
          </label>
          <button type="submit">Create Reunion Plan</button>
        </form>
      )}

      <div className="plans-list">
        {plans.length === 0 ? (
          <p className="no-plans">No reunion plans available.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <h3>{new Date(plan.date).toLocaleDateString()}</h3>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(plan.id)}
                  title="Delete plan"
                >
                  Delete
                </button>
              </div>
              <p><strong>Location:</strong> {plan.location}</p>
              <p>{plan.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reunion;
