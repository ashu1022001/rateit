import React from "react";
import "./Userpost.css"
import ReactTimeAgo from 'react-time-ago'
import useUser from "../Store";

function Userpost(props) {

  const emos = ["😠", "😦", "😑", "😀", "😍"];
  const {currUser} = useUser();

  return (
    <div className="post-content">
      <div className="post-header">
        <span className="user-img">
        <img src ={currUser?.profilePicUrl} />
        </span>
        <span>
          <span className="user-post-name">{currUser?.userName}</span>
          <span className="user-post-date">{props.date && <ReactTimeAgo date={new Date(props.date)} /> }</span>
        </span>
      </div>
      <div className="user-post-img">
      <img src = {props.image} />
      </div>
      <div className="user-post-details">
        <span className="user-post-club">
          <span className="user-post-name">{currUser?.userName}</span>
          <span className="user-post-caption">{props.caption}</span>
        </span>
        <span className="user-post-reacts"><span>{props.reaction}</span> <span> {emos[Math.floor((props.reaction)%4)]}</span></span>
      </div>
    </div>
  );
}

export default Userpost;
