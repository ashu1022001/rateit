import React from "react";
import { useNavigate } from "react-router-dom";

function UserPopOver() {

  let navigate = useNavigate();
  const  userProfile= ()=>{
   navigate("/rateit/user", { replace: true });
   }

   const logoutHandler =() =>{
    localStorage.clear();
    navigate("/",{replace:true});
   }

  return (
    <div className="user-pop-over-cont">
      <div>
      <span><i class="fa-regular fa-circle-user"></i></span>
      <span onClick={userProfile}>profile</span>
      </div>
      <div>
      <span><i class="fa-solid fa-gear"></i></span>
      <span>settings</span>
      </div>
      <div>
      <span><i class="fa-solid fa-arrow-right-from-bracket"></i></span>
      <span onClick={logoutHandler}>logout</span>
      </div>
    </div>
  );
}

export default UserPopOver;
