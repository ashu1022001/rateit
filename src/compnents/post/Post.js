import React, { useState } from "react";
import "./Post.css";
import { useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Post(props) {
  const numbers = props.numbers;
  const emojiCount = numbers % 5;
  const [emojis, setEmojis] = useState("😑");
  const emos = ["😠", "😦", "😑", "😀", "😍"];
  const [i, setI] = useState(0);

  return (
    <div className="content">
      <div className="post-details">
        <span className="user-img">
        <img src={props.userDp  ||<Skeleton/>} alt="user-img"></img>
        </span>
        <h5 className="username">
        {props.name}
        </h5>
        <span className="post-time">
          { (props.date && <ReactTimeAgo date={new Date(props.date)} /> )||<Skeleton/>}
        </span>
      </div>
      <div className="picture">
        <img src={props.url ||<Skeleton count={10}/>} alt="img"></img>
      </div>
      <div id="interaction">
        <span className="uname">{props.name ||<Skeleton/>}</span>

        <div className="rate">
          <div className="emoji">{emojis||<Skeleton/>}</div>
          <input
            type="range"
            min="0"
            max="99"
            step="1"
            defaultValue="50"
            onMouseMove={function (e) {
              setI(Math.floor(e.target.value / 20));
              setEmojis(emos[i]);
            }}
          ></input>
        </div>
        <span className="urated">
          <span className="emoji">{emos[emojiCount] ||<Skeleton/>}</span>
          <span className="totalRatings">{numbers ||<Skeleton/>} others</span>
        </span>
      </div>
    </div>
  );
}
export default Post;
