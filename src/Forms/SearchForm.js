import React, {useState} from "react";
import './searchForm.css'
function SearchForm({searchFor}){
const [formData,setFormData] = useState("");


const handleChange = (evt) =>{
const SearchTerm = evt.target.value;
 setFormData(SearchTerm)
}

const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(formData)
    setFormData("")
    
}

    return(
        <div id="searchForm">
           
            <form onSubmit={handleSubmit}>

                    <input 
                        name="searchTerm"
                        id="searchTerm"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={formData}>

                    </input>

                    <button>submit</button>
            </form>
            

        </div>
    )
}

export default SearchForm;