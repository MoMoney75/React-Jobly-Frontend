import React, {useState,useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Routes/Navbar';
import Skeleton from '../Routes/Routes';
import JoblyApi from '../API/JoblyAPI';
import { jwtDecode } from 'jwt-decode'
import useLocalStorage from '../Hooks/hooks';
import UserContext from '../Context/UserContext';
import './App.css'

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const TOKEN_STORAGE_ID = "jobly-token";
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  
  
  async function register(signupData){
        try{
        let token = await JoblyApi.register(signupData)
         setToken(token);
          return( {success:true}  )
        }
         catch(err){
          return({success: false,err} )
         }
    }


  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwtDecode(token)
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);


  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }



  /** Checks if a job has been applied for. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job: make API call and update set of application IDs. */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }



  function logout() {
    setCurrentUser(null);
    setToken(null);
  }
  return (
    <div>
      <BrowserRouter>
      <UserContext.Provider
            value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob}}>
            <Navbar logout={logout}/>
            <Skeleton login={login} register={register} />
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );


}
  

export default App;
