import React from "react"
import { Link } from "react-router-dom"
function JobsCard({jobs}){

    return(
        <div>
    <ol>
    {jobs && jobs.map(j => (
      <div key={j.id}>
        <li>
          <Link to={`/jobs/${j.id}`} state={{j}}><h4>{j.title}</h4> </Link>
          {j.salary === null ? 
            <p>Salary not available</p>
          :
          
            <p>Salary: ${j.salary}</p>
          }

        </li>
      </div>
    ))}
    </ol>
    </div>
    )
}

export default JobsCard