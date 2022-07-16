import React from "react";
import {Navigate} from "react-router-dom";

const ProtectedRoute = ({manager, children}) =>{
   if(!manager){
    return <Navigate to="/" replace/>
   }

   return children
};

export default ProtectedRoute;