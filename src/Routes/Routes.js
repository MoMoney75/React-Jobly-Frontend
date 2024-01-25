import React from "react";
import {Route, Routes, Navigate } from "react-router-dom";
import CompaniesList from "../Companies/CompaniesList";
import CompanyDetails from "../Companies/Company";
import JobsList from "../Jobs/JobsList";
import Job from "../Jobs/Job";
import RegisterForm from "../Forms/RegisterForm";
import LoginForm from "../Forms/LoginForm";
import PrivateRoute from "./PrivateRoute";
import ProfileForm from "../Profile/EditProfiles";
import Home from "../Home/Home";

function Skeleton({login, register, applyToJob}){
    return (
        <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/register" element={<RegisterForm register={register} />} />
              <Route path="/login" element={<LoginForm login={login} />} />

              <Route path="/companies"  element={
                <PrivateRoute>
                  <CompaniesList />
                </PrivateRoute>}/>

              <Route path="/jobs" element={
                <PrivateRoute>
              <JobsList />
                </PrivateRoute>}/>

              <Route path="/jobs/:jobID" element={
                <PrivateRoute>
              <Job applyToJob={applyToJob}/>
                </PrivateRoute>}/>

              <Route path="/companies/:company" element={
                <PrivateRoute>
              <CompanyDetails />
                </PrivateRoute>}/>

              <Route path="/settings" element={
                <PrivateRoute>
              <ProfileForm />
                </PrivateRoute>}/>

        </Routes>



      );
    };
    
export default Skeleton