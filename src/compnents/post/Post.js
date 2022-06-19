import React, { useState } from "react";
import "./Post.css";
import { useEffect } from "react";

function Post(props) {

  const numbers =props.numbers;
  const emojiCount = numbers%5;
  const [emojis,setEmojis] = useState('😑');
  const emos = ['😠','😦','😑','😀','😍'];
  const [i,setI] = useState(0)

  return (
    <div className="content">
      <div className="picture">
        <img src={props.url} alt="img"></img>
      </div>
      <div id="interaction">
        <span className="uname">{props.id}</span>

        <div className="rate">
          <div className="emoji">{emojis}</div>
          <input type="range" min="0" max="99" step="1" defaultValue="50" onMouseMove={function(e){
            setI(Math.floor(e.target.value/20));
            setEmojis(emos[i])
          }}></input>
        </div>
       <span className="urated">
       <span className="emoji" >{emos[emojiCount]}</span>
       <span className="totalRatings">{numbers} others</span>
       </span>
      </div>
    </div>
  );
}
export default Post;


