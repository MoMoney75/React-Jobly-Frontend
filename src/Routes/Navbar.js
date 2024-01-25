import React, {useContext} from "react"
import { Link,} from "react-router-dom";
import UserContext from "../Context/UserContext";
import './NavBar.css'

function Navbar({logout}){
const { currentUser } = useContext(UserContext);

function loggedInNav(){
  return(
<div className="loggedIn-NavBar">

    <ul>
      <li>
        <Link className="Link" to="/">Home</Link>
      </li>
      <li>
        <Link className="Link" to="/companies">Companies</Link>
      </li>
      <li>
        <Link className="Link" to="/jobs">Jobs</Link>
      </li>

      <li>
        <Link className="Link" to="/settings">Profile</Link>
      </li>

    <li>
      <Link className="Link" to="/" onClick={logout}>Logout {currentUser.username}</Link>
    </li>
    </ul>

  </div>
  )}

  function loggedOutNav(){
    return(
      <div className="loggedout-NavBar">

        <ul>
          <li>
            <Link className="Link" to='/login'>Login</Link>
          </li>

          <li>
            <Link className="Link" to='/register'>Signup</Link>
          </li>
        </ul>

      </div>
    )
  }

  return (
    <nav>
      <Link id="Jobly" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
);
}
export default Navbar;