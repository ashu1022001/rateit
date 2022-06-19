import React, { useState } from "react";
import { useEffect } from "react";
import "./Suggestion.css"
import SuggestedUser from "../suggestedUser/SuggestedUser";


export default function Suggestion() {

  const [users,setUsers] = useState([]);

  useEffect(()=>{
  fetch("https://dummyapi.io/data/v1/user?limit=10", {
    headers: {
      "app-id": "62adde4072c63ad0c100fa56",
    },
  })
    .then((users) => users.json())
    .then((users) => setUsers(users.data));
  },[])
  return (
    
      <div className="suggestion-cont">
        <div className="current-user">
          <span className="user-box">
            <img src="/img/ashu.jpg" alt="userimage" />
          </span>
          <span className="user-name">
          <h5>ashutoshsingh</h5>
          <h6>Ashutosh Singh</h6>
          </span>

        </div>
        <div className="sugg-win">
        <span> <h5>suggested for you</h5></span>
        {
          users.map((user)=>{
            return(
              <SuggestedUser
              fname = {user.firstName}
              lname = {user.lastName}
              imgUrl = {user.picture}
              />

            )
          })
        }
        </div>
      </div>
  );
}
