import React, { useState } from "react";
import { useEffect } from "react";
import "./Suggestion.css"
import useUser from "../Store";


import SuggestedUser from "../suggestedUser/SuggestedUser";


export default function Suggestion() {
  // const currUser = useUser(state=>state.currUser);
  const {currUser} = useUser();
  

  const [users,setUsers] = useState([]);
  const [showMoreBtn,setShowMoreBtn] = useState(false);
  const [btnText,setBtnText] = useState("show more")

  useEffect(()=>{
  fetch("https://dummyapi.io/data/v1/user?limit=10", {
    headers: {
      "app-id": "62adde4072c63ad0c100fa56",
    },
  })
    .then((users) => users.json())
    .then((users) => setUsers(users.data));
  },[])


  const showMoreFn =(e)=>{
    setShowMoreBtn(!showMoreBtn);
    if(btnText ==="show more"){
      setBtnText("show less")
    }
    else{
      setBtnText("show more")
    }
    
  }

  return (
    
      <div className="suggestion-cont">
        <div className="current-user">
          <span className="user-box">
            <img src={currUser?.profilePicUrl} alt="userimage" />
          </span>
          <span className="user-name">
          <h5>{currUser?.name}</h5>
           <h6>{currUser?.userName}</h6>
          </span>

        </div>
        <div className={`sugg-win ${showMoreBtn  && 'show-more'}`}>
        <span> <h5>Suggested for you</h5></span>
        {
          users.map((user)=>{
            return(
              <SuggestedUser 
              key={user.id}
              id ={user.id}
              fname = {user.firstName}
              lname = {user.lastName}
              imgUrl = {user.picture}
              />

            )
          })
        }
        
        </div>
        <button onClick={showMoreFn} className="show-more-btn" >{btnText}</button>
      </div>
  );
}
