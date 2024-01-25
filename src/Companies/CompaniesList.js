import React, {useState, useEffect} from "react";
import JoblyApi from "../API/JoblyAPI";
import SearchForm from "../Forms/SearchForm";
import CompaniesCard from "./CompaniesCard";


function CompaniesList() {
    const [companies, setCompanies] = useState(null)
    useEffect(function getCompaniesOnMount() {
        console.debug("CompanyList useEffect getCompaniesOnMount");
        searchCompanies();
      }, []);
    
      async function searchCompanies(name) {
        try{
        let companies = await JoblyApi.getCompanies(name);
        if(companies.length > 0){
        setCompanies(companies);}
        else{return}
        }

        catch(e){
            console.log("ERROR!!:", e)
        }
      }
    
  return (
    <div>
    <div id="searchForm">
    <SearchForm searchFor={searchCompanies}/>
    </div>
    <div>
    <CompaniesCard companies={companies}/>
    </div>
    </div>
  );
}

export default CompaniesList;



