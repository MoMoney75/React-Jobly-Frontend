import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css'

function LoginForm({login}){
    const navigate = useNavigate()
    const INITIAL_STATE = {
        username : "",
        password : ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([])

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await login(formData)
        if(result.success){
        navigate('/companies')
        }
        else{
                setFormErrors(result.errors)
    }        
    }

    const handleChange = (evt) => {
        const {name,value} = evt.target
        setFormData(data => ({...data, [name]: value}))
    }

    return (
        <div>
        <div>
            <h1>Welcome to Jobly!</h1>
        </div>
        <div className="form-div">
        <form onSubmit={handleSubmit}>
        <p>Please login or create a new account to continue</p>

        <div className="input">

        <label htmlFor="username ">username:</label>
        <input name="username"
               id="username"
               type="text"
               onChange={handleChange}
               value={formData.username}
               placeholder="username">
        </input>
        </div>

        <div className="input">
        <label htmlFor="password">password:</label>
        <input name="password"
               id="password"
               type="password"
               onChange={handleChange}
               value={formData.password}
               placeholder="password">
        </input>
        </div>
        

        {formErrors.length ? <p>{formErrors}</p> : null}
        <button>Login</button>
        </form>
        </div>


        </div>
    )

}


export default LoginForm;