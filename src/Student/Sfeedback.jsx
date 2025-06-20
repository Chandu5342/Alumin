import React, { useState } from 'react';
import './Sfeedback.css';

const Sfeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(feedback.trim() === '') return;

    // Here you would typically send the feedback to your backend or state
    // For example, using fetch or axios to POST feedback data

    console.log('Feedback submitted:', feedback);

    setSubmitted(true);
    setFeedback('');
  };

  return (
    <div className="feedback-container">
      <h2>Give Feedback to Alumni</h2>
      {submitted && <p className="success-msg">Thank you for your feedback!</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows="5"
          required
        ></textarea>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Sfeedback;
