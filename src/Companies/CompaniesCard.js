import React from "react";
import { Link } from "react-router-dom";
function CompaniesCard({companies}){


return(
    <div id="CompaniesList">
<ol>
{companies && companies.map(c => (
  <div key={c.id}>
    <li>
      <Link to={`/companies/${c.handle}`} state={{c}}><h4>{c.name}</h4> </Link>
      <p>{c.description}</p>
    </li>
  </div>
))}
</ol>
</div>
)
}

export default CompaniesCard;