import React, {useState, useEffect} from "react";
import JoblyApi from "../API/JoblyAPI";
import JobsCard from "./JobsCard";
import SearchForm from "../Forms/SearchForm";

function JobsList() {
    const [jobs, setJobs] = useState(null)
    useEffect(function getJobs() {
        console.debug("JobsList useEffect getCJobs");
        searchJobs();
      }, []);
    
      async function searchJobs(title) {
        try{
        let jobs = await JoblyApi.getJobs(title);
        if(jobs.length > 0){
        setJobs(jobs)}
        else{return}
        }

        catch(e){
            console.log("ERROR!!:", e)
        }
      }
    
  return (
    <div>
        <SearchForm  searchFor={searchJobs}/>
        <JobsCard jobs={jobs} />
    </div>
  );
}

export default JobsList;

