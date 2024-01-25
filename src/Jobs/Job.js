import React, { useEffect, useState }  from "react";
import {useParams} from 'react-router-dom'
import JoblyApi from "../API/JoblyAPI";
import JobCard from "./JobCard";


function Job(){
const {jobID} = useParams();
const [jobData, setJobData] = useState(null)
console.log("JOB ID:", jobID)

useEffect(() => {
    const getData = async()=> {
        try{
        const result = await JoblyApi.getJob(jobID)
        console.log("JOB ID:", jobID)
        setJobData(result)
        console.log(result)
        }
        catch(e){
            console.log("Error wile trying to get job data :",e)
        }
    }
    getData();
},[jobID])

if (!jobData) {
    return <p>Loading...</p>;
  }

    return(
        <div>
            <JobCard jobData={jobData}/>
              
        </div>
    )
}

export default Job;
