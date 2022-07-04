import React from "react";

import { useNavigate } from "react-router-dom";
import useUser from "../Store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCircleUser, faGear } from "@fortawesome/free-solid-svg-icons";

function UserPopOver() {
  const currUser = useUser(state=>state.currUser);
  const logout = useUser(state=> state.removeCurrUser)

 

  let navigate = useNavigate();
  const  userProfile= ()=>{
   navigate(`/rateit/user?email=${currUser.email}`, { replace: true });
   }

   const logoutHandler =() =>{
    localStorage.clear();
    logout();
    navigate("/",{replace:true});
   }

  return (
    <div className="user-pop-over-cont">
      <div>
      <span><FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon></span>
      <span onClick={userProfile}>profile</span>
      </div>
      <div>
      <span><FontAwesomeIcon icon={faGear}/></span>
      <span>settings</span>
      </div>
      <div>
      <span><FontAwesomeIcon icon={faArrowRightFromBracket}/></span>
      <span onClick={logoutHandler}>logout</span>
      </div>
    </div>
  );
}

export default UserPopOver;
