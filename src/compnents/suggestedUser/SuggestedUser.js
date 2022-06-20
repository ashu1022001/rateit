import React from "react";
import "./SuggestedUser.css";
import Tippy from '@tippyjs/react';
export default function SuggestedUser(props) {
  return (
    <div className="sugg-user-cont">
      <span className="sugg-user-img">
        <img src={props.imgUrl}></img>
      </span>
      <span>
        <h6 data-tip="follow">{props.fname + props.lname}</h6>
      </span>
      <span>
      <Tippy content="Follow">
    <i class="fa-solid fa-circle-plus"></i>
  </Tippy>
       </span>
    </div>
  );
}
