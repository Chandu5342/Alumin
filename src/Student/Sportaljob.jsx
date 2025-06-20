import React, { useState } from 'react';
import './Sportaljob.css';

const Sportaljob = () => {
  // Dummy jobs posted by alumni
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", postedBy: "John Doe" },
    { id: 2, title: "Data Analyst", company: "Microsoft", postedBy: "Jane Smith" },
    { id: 3, title: "DevOps Engineer", company: "Amazon", postedBy: "Rahul Kumar" },
  ]);

  // Track applied jobs by id
  const [appliedJobs, setAppliedJobs] = useState([]);

  const applyJob = (jobId) => {
    if (appliedJobs.includes(jobId)) {
      alert("You have already applied to this job.");
      return;
    }

    // Simulate sending application to alumni here
    alert(`Application sent to the alumni who posted job #${jobId}`);

    setAppliedJobs([...appliedJobs, jobId]);
  };

  const deleteJob = (jobId) => {
    // Confirm deletion
    if(window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  return (
    <div className="job-portal-container">
      <h2>Jobs Posted by Alumni</h2>
      {jobs.length === 0 ? (
        <p>No jobs posted currently.</p>
      ) : (
        <ul className="job-list">
          {jobs.map(job => (
            <li key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Posted by:</strong> {job.postedBy}</p>
              <div className="job-actions">
                <button 
                  className={`apply-btn ${appliedJobs.includes(job.id) ? 'applied' : ''}`} 
                  onClick={() => applyJob(job.id)}
                  disabled={appliedJobs.includes(job.id)}
                >
                  {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
                </button>
                <button className="delete-btn" onClick={() => deleteJob(job.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sportaljob;
