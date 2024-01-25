import React, { useEffect, useState }  from "react";
import {useParams,Link} from 'react-router-dom'
import JoblyApi from "../API/JoblyAPI";
import CompanyCard from "./CompanyCard";
function CompanyDetails(){
const {company} = useParams();
const [companyData, setCompanyData] = useState(null)
const [isHidden, setIsHidden] = useState(true)
const toggleHidden = () =>{
    setIsHidden(!isHidden)
}

useEffect(() => {
    const getData = async()=> {
        try{
        const result = await JoblyApi.getCompany(company)
        setCompanyData(result)
        console.log(result)
        }
        catch(e){
            console.log("Error wile trying to get company data :",e)
        }
    }
    getData();
},[company])

if (!companyData) {
    return <p>Loading...</p>;
  }

    return(
        <div>
            <CompanyCard companyData={companyData}  isHidden={isHidden}/>
            <button onClick={toggleHidden}>
                {isHidden === true ? "show job details" : "hide job details"}
            </button>
        </div>
    )
}

export default CompanyDetails;
