import React, { useState, useContext } from "react";
import JoblyApi from "../API/JoblyAPI";
import UserContext from "../Context/UserContext";
import './EditProfile.css'
function ProfileForm() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    username: currentUser.username,
    password: currentUser.password,
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()


  async function handleSubmit(evt) {
    evt.preventDefault();

    let newData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await JoblyApi.updateProfile(username, newData);

    } catch (errors) {
      setFormErrors(errors);
      return;
    }

    setFormData(data => ({ ...data, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setCurrentUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div>

        <h3>Edit Profile</h3>


            <div>
            <form id="edit-form">

                <label>First Name</label>
                <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />



                <label>Last Name</label>
                <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />




                <label>Email</label>
                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />



                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}/>


              {formErrors.length
                  ? <p>{formErrors}</p> : null}

              {saveConfirmed ? <p>updated successfull</p> : null}

              <button onClick={handleSubmit}>
                Save Changes
              </button>
            </form>
            </div>
      </div>
  );
}

export default ProfileForm;