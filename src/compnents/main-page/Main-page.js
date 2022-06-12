import "./Main-page.css";
import React, { useState } from "react";
import img from "./img/ashu.jpg";
import "https://kit.fontawesome.com/fe838ae10b.js";
import { useEffect } from "react";
import Post from "../post/Post";

function MainPage() {
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((json) => json)
      .then((posts) => rendPost(posts));
      function rendPost(posts){
      posts.map((post)=>{
         console.log(post)
          return(
          <Post 
          id= { post.id}
          url={post.url} 
          />
          )
      })
    }
  }, [1]);

  return (
    <div>
      <div className="header">
        <div className="head">
          <div className="logo">
            Rate<span className="logoit">it</span>
          </div>
          <div className="nav-bar">
            <div className="search-cont">
              <button id="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                type="text"
                id="search-user"
                placeholder="search user.."
              ></input>
            </div>
          </div>
        </div>
      </div>

      {
        // <Post
        //     name ="Ashutosh"
        //     image= "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        //     />
      }
    </div>
  );
}
export default MainPage;
