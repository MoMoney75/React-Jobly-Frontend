import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

function PrivateRoute({path='/',children}){
const {currentUser} = useContext(UserContext)

if(!currentUser){
    return <Navigate to={path} />
}

return(
    children
)
}

export default PrivateRoute