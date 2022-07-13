import React, { useState } from "react";
import {auth} from "../firebase/firebase"


import { useNavigate } from "react-router-dom";
import useUser from "../Store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faGear } from "@fortawesome/free-solid-svg-icons";

function UserPopOver() {
  // const currUser = useUser(state=>state.currUser);
  // const logout = useUser(state=> state.removeCurrUser)

  const[darkMode,setDarkMode] =useState(false);

 

  let navigate = useNavigate();
  const  userProfile= ()=>{
   navigate(`/rateit/user`);
   }

   const  logoutHandler =() =>{
    localStorage.clear();
    auth.signOut();
    navigate("/",{replace:true});
    //  logout();
   }

   const changeMode=()=>{
    setDarkMode(!darkMode)

   }

  return (
    <div className="user-pop-over-cont">
      <div>
      <span><FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon></span>
      <span onClick={userProfile}>Profile</span>
      </div>
      <div>
      <span><FontAwesomeIcon 
      icon={faGear}/></span>
      <span>Settings</span>
      </div>
      <div>
      <span><FontAwesomeIcon icon={faArrowRightFromBracket}/></span>
      <span onClick={logoutHandler}>Logout</span>
      </div>
    </div>
  );
}

export default UserPopOver;
