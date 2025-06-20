import React, { useEffect, useState } from 'react';
import './Portaljob.css';
import axios from 'axios';

const API = 'https://aluminiserver.onrender.com/api/jobs';

const Portaljob = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([]);

  const [company, setCompany] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [jobMode, setJobMode] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  // Fetch jobs posted by this alumni
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API}/alumni/${user.id}`); // ✅ use id, not _id
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
    }
  };

  useEffect(() => {
    if (user) fetchJobs();
  }, [user]);

  const toggleForm = () => {
    setShowForm(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!company || !jobRole || !packageAmount || !skills || !description || !location || !jobMode) {
      alert("Please fill all fields.");
      return;
    }

    const newPost = {
      alumniId: user.id, // ✅ use id, not _id
      company: company.trim(),
      jobRole: jobRole.trim(),
      packageAmount: packageAmount.trim(),
      skills: skills.split(',').map(s => s.trim()),
      description: description.trim(),
      location: location.trim(),
      jobMode: jobMode.trim(),
    };

    try {
      await axios.post(`${API}/create`, newPost);
      fetchJobs();
      setCompany('');
      setJobRole('');
      setPackageAmount('');
      setSkills('');
      setDescription('');
      setLocation('');
      setJobMode('');
      setShowForm(false);
    } catch (err) {
      console.error('Failed to post job:', err);
      alert('Error posting job');
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchJobs();
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job');
    }
  };

  return (
    <div className="portaljob-container">
      <div className="top-button-wrapper">
        <button
          onClick={toggleForm}
          className="add-btn"
          title={showForm ? 'Close Form' : 'Add Job Post'}
        >
          +
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="job-form">
          <input type="text" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} required />
          <input type="text" placeholder="Job Role" value={jobRole} onChange={e => setJobRole(e.target.value)} required />
          <input type="text" placeholder="Package (e.g. 6 LPA)" value={packageAmount} onChange={e => setPackageAmount(e.target.value)} required />
          <input type="text" placeholder="Skills (comma-separated)" value={skills} onChange={e => setSkills(e.target.value)} required />
          <input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
          <input type="text" placeholder="Job Mode (e.g., Full-time, Remote)" value={jobMode} onChange={e => setJobMode(e.target.value)} required />
          <textarea placeholder="Job Description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required />
          <button type="submit">Post Job</button>
        </form>
      )}

      <div className="posts-list">
        {posts.length === 0 ? (
          <p className="no-posts">No job posts yet.</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="post-item">
              <h3>{post.company}</h3>
              <p><strong>Role:</strong> {post.jobRole}</p>
              <p><strong>Package:</strong> {post.packageAmount}</p>
              <p><strong>Location:</strong> {post.location}</p>
              <p><strong>Mode:</strong> {post.jobMode}</p>
              <p><strong>Description:</strong> {post.description}</p>
              <p><strong>Skills:</strong> {post.skills.map((skill, i) => (
                <span key={i} style={{
                  background: "#e0e0e0",
                  padding: "4px 8px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  display: "inline-block"
                }}>{skill}</span>
              ))}</p>
              <p><strong>Posted On:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
              <button onClick={() => handleRemove(post._id)} className="remove-btn" title="Remove post">Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Portaljob;
