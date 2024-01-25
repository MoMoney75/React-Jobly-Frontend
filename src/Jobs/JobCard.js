import React, {useState,useContext} from "react";
import UserContext from "../Context/UserContext";

function JobCard({jobData}){
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();


  React.useEffect(function updateAppliedStatus() {

    setApplied(hasAppliedToJob(jobData.id));
  }, [jobData.id, hasAppliedToJob]);

  /** Apply for a job */
  async function handleApply(evt) {
    if (hasAppliedToJob(jobData.id)) return;
    applyToJob(jobData.id);
    setApplied(true);
    console.log("successfully applied to job", jobData.id, applied)
  }

return(
<div>
<h1>
{jobData.title}
</h1>
<h2>{jobData.company.name}</h2>
<p>{jobData.company.description}</p>
{jobData.salary === null ? 
            <p>Salary not available</p>
          :
          
            <p>${jobData.salary}</p>
          }
{jobData.equity === null?  <p>Equity not available</p> :    
    <p>Equity: {jobData.equity}</p>}
    
    
    <button onClick={handleApply}
    disabled={applied}>  {applied ? "Applied" : "Apply" }</button>
</div>

)

}

export default JobCard
