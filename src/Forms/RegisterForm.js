import React, {useState} from 'react'

function RegisterForm({register}){
    const INITIAL_STATE = {
        username : "",
        password : "",
        firstName : "",
        lastName : "",
        email : ""
    }
    const [formData, setFormData] = useState(INITIAL_STATE)
  
     async function handleSubmit(evt){
        evt.preventDefault();
        await register(formData);
        setFormData(INITIAL_STATE)

    }

    const handleChange = (evt) => {
    const {name,value} = evt.target
    setFormData(data => ({...data, [name]: value}))
}
    


return(
<div>
    <h1>Join today for free!</h1>
    <div>
<form onSubmit={handleSubmit}>

<input name='username'
type='text'
id='username'
value={formData.username}
onChange={handleChange}
placeholder='username'>
</input>

<input name='password'
id='password'
type='password'
value={formData.password}
onChange={handleChange}
placeholder='password'>
</input>

<input
name='firstName'
id='firstName'
type='text'
value={formData.firstName}
onChange={handleChange}
placeholder='First Name'
></input>

<input name='lastName'
id='lastName'
type='text'
value={formData.lastName}
onChange={handleChange}
placeholder='Last Name'>
</input>

<input name='email'
id='email'
type='text'
value={formData.email}
onChange={handleChange}
placeholder='Email'>
</input>
<button>submit</button>
</form>
</div>
</div>

)
}

export default RegisterForm