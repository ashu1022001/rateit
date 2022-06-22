import React, { useState } from "react";
import "./SuggestedUser.css";
import Tippy from "@tippyjs/react";
export default function SuggestedUser(props) {

  const [followbtn,setFollowbtn] = useState(true);
  const [content,setContent] = useState("Add");

  const followFn=()=>{
    setFollowbtn(false)
    setContent("Added")
  }


  return (
    <div className="sugg-user-container">
    <span className="sugg-user-cont">
      <span className="sugg-user-img">
        <img src={props.imgUrl}></img>
      </span>
      <span>
        <h6 data-tip="follow">{props.fname + props.lname}</h6>
      </span>
      </span>
      <span>
        <Tippy content={content}>
          <button onClick={followFn}>{followbtn ?<i className="fa-solid fa-circle-plus fa-xl"></i>:<i className="fa-solid fa-check fa-xl"></i>}</button>
        </Tippy>
      </span>
    </div>
  );
}
