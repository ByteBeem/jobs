import React from 'react';
import './JobCard.scss';

const JobCard = ({ job }) => {

  const handleApplyClick = () => {
    window.location.href = job.Link; 
  };

  return (
    <div className="job-card">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <button className="apply-button" onClick={handleApplyClick}>Apply</button>
    </div>
  );
};

export default JobCard;
