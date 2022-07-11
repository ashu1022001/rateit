import React, { useState } from "react";
import "./Post.css";
import UsersProfile from "../usersProfile/UsersProfile";
import ReactTimeAgo from "react-time-ago";
import Skeleton from 'react-loading-skeleton'
import { useNavigate } from "react-router";
import 'react-loading-skeleton/dist/skeleton.css'

function Post(props) {
 
  const numbers = props.numbers;
  const navigate = useNavigate();
  const emojiCount = numbers % 5;
  const [emojiIndex, setEmojisIndex] = useState(0);
  const emos = ["😠", "😦", "😑", "😀", "😍"];

  const openClickedUserProfile=()=>{
    navigate(`/rateit/userprofile/${props.id}`);
  }

  return (
    <div className="content">
      <div className="post-details">
        <span className="user-img" onClick={openClickedUserProfile}>
          <img src={props.userDp ||<Skeleton/>} alt="user-img"></img>
        </span>
        <h5 className="username" onClick={openClickedUserProfile}>{props.name  ||<Skeleton/>}</h5>
        <span className="post-time">
          {props.date && <ReactTimeAgo date={new Date(props.date)} />}
        </span>
      </div>
      <div className="picture">
        <img src={props.url ||<Skeleton count={10}/>} alt="img" ></img>
      </div>
      <div className="interaction">
        <div className={`${props.caption && "post-caption-details"} `}>
          <span className="uname"><h5>{props.caption && props.name }</h5></span>
          <span className="post-caption"><h5> {props.caption ? props.caption:null}</h5></span>
        </div>
        <div className="user-interaction">
          <div className="rate">
            {emos.map(
              (e, i) =>
                i === emojiIndex && (
                  <div className="emoji" key={e}>
                    <div className={`rating`}>{e}</div>
                  </div>
                )
            )}
            <input
              type="range"
              min="0"
              max="99"
              step="1"
              defaultValue="50"
              onChange={function (e) {
                let i = Math.floor(e.target.value / 20);
                setEmojisIndex(i);
              }}
            ></input>
          </div>
          <span className="urated">
            <span className="emoji">{emos[emojiCount]}</span>
            <span className="totalRatings">{numbers} others</span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default Post;
