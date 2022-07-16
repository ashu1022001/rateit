import React from 'react'
import { Navigate,Outlet } from 'react-router';
const useAuth = ()=>{
    return !!localStorage.getItem("user");
}

function ProtectedRoutes() {
    const isAuth = useAuth();
  return isAuth ? <Outlet/>: <Navigate to ="/"/>;
}

export default ProtectedRoutes