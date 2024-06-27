import React from 'react';
import './JobCard.scss';

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <button className="apply-button">Apply</button>
    </div>
  );
};

export default JobCard;
