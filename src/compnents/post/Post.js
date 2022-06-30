import React, { useState } from "react";
import "./Post.css";
import { useEffect } from "react";
import ReactTimeAgo from "react-time-ago";

function Post(props) {
  const numbers = props.numbers;
  const emojiCount = numbers % 5;
  const [emojis, setEmojis] = useState("😑");
  const [rating5,setRating5] = useState(false)
  const emos = ["😠", "😦", "😑", "😀", "😍"];
  const [i, setI] = useState(0);

  return (
    <div className="content">
      <div className="post-details">
        <span className="user-img">
          <img src={props.userDp} alt="user-img"></img>
        </span>
        <h5 className="username">{props.name}</h5>
        <span className="post-time">
          {props.date && <ReactTimeAgo date={new Date(props.date)} />}
        </span>
      </div>
      <div className="picture">
        <img src={props.url} alt="img"></img>
      </div>
      <div id="interaction">
        <div>
          <span className="uname">{props.name}</span>
        </div>

        <div className="rate">
          <div className="emoji"><div className={`${rating5 && "rating"} `}>{emojis}</div></div>
          <input
            type="range"
            min="0"
            max="99"
            step="1"
            defaultValue="50"
            onMouseMove={function (e) {
              setI(Math.floor(e.target.value / 20));
              setRating5(!rating5);
              setEmojis(emos[i]);
              
            }}
          ></input>
        </div>
        <span className="urated">
          <span className="emoji">{emos[emojiCount]}</span>
          <span className="totalRatings">{numbers} others</span>
        </span>
      </div>
    </div>
  );
}
export default Post;
