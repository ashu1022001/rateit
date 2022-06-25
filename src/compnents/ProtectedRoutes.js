import React from 'react'
import { Navigate,Outlet } from 'react-router';
const useAuth = ()=>{
    return localStorage.length>0;
}

function ProtectedRoutes() {
    const isAuth = useAuth();
  return isAuth ? <Outlet/>: <Navigate to ="/"/>;
}

export default ProtectedRoutes