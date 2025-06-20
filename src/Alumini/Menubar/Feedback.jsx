import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || rating === 0) {
      alert('Please fill name, email, and rating.');
      return;
    }

    // You can integrate with backend here to save feedback

    setConfirmation('Thank you for your feedback!');
    setName('');
    setEmail('');
    setRating(0);
    setComments('');
  };

  return (
    <div className="feedback-container">
      <h2>Alumni Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label>
          Name<span className="required">*</span>:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        </label>

        <label>
          Email<span className="required">*</span>:
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />
        </label>

        <label>
          Rating<span className="required">*</span>:
          <div className="rating-options">
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={rating === num}
                  onChange={() => setRating(num)}
                />
                {num} Star{num > 1 ? 's' : ''}
              </label>
            ))}
          </div>
        </label>

        <label>
          Comments:
          <textarea
            value={comments}
            onChange={e => setComments(e.target.value)}
            placeholder="Your comments..."
            rows={4}
          />
        </label>

        <button type="submit">Submit Feedback</button>
      </form>

      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
};

export default Feedback;
