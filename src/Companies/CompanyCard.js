import React, { useState, useContext } from "react";
import UserContext from "../Context/UserContext";
import './CompanyCard.css'

function CompanyCard({ companyData, isHidden }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [appliedJobs, setAppliedJobs] = useState([]);

  React.useEffect(() => {
    const appliedStatus = companyData.jobs.map((job) => ({
      id: job.id,
      applied: hasAppliedToJob(job.id),
    }));
    setAppliedJobs(appliedStatus);
  }, [companyData.jobs, hasAppliedToJob]);

  async function handleApply(jobId) {
    if (hasAppliedToJob(jobId)) return;

    applyToJob(jobId);

    // Update the applied status for the specific job
    setAppliedJobs((prevStatus) =>
      prevStatus.map((job) =>
        job.id === jobId ? { ...job, applied: true } : job
      )
    );
  }

  return (
    <div>
      <h1>{companyData.name}</h1>

      <p>{companyData.description}</p>
      <p>Employees: {companyData.numEmployees}</p>
      <div id="jobs-list">
        <h2>Available jobs:</h2>
        <ol>
          {companyData.jobs.map((j) => (
            <li key={j.id}>
              <h5>{j.title}</h5>
              <div id='job-application'>
              <ul style={isHidden === true ? { visibility: "hidden" } : null}>
                {j.salary === null? <li>Salary not available</li> : <li>Salary: ${j.salary}</li>}
                {j.equity === null? <li>Equity not available</li> : <li>Equity: {j.equity}</li> }
                <button onClick={() => handleApply(j.id)} disabled={hasAppliedToJob(j.id)}>
                  {appliedJobs.find((job) => job.id === j.id)?.applied
                    ? "Applied"
                    : "APPLY NOW!"}
                </button>
              </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default CompanyCard;

