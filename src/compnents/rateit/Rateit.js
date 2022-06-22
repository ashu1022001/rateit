import "./Rateit.css";
import React, { useState } from "react";
import "https://kit.fontawesome.com/fe838ae10b.js";
import { useEffect } from "react";
import Post from "../post/Post";
import Suggestion from "../suggestion/Suggestion";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import UserPopOver from "../pop-overs/UserPopOver";
import { useNavigate } from "react-router-dom";


function Rateit() {
 
 
  const [posts, setPosts] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/post?limit=10", {
      headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      },
    })
      .then((user) => user.json())
      .then((user) => setPosts(user.data));
  }, []);
  const serchUser = (e) => {
    e.preventDefault();
    const user = e.target.elements.userName.value.trim();
    if (user) {
      alert(`no user found with ${user}`);
      console.log(user);
    }
  };
  return (
    <div>
      <div className="header">
        <div className="logo">
          <h3>
            <span>Rate</span>
            <span className="logoit">it</span>
          </h3>
        </div>
        <div className="head">
          <div className="nav-bar">
            <div className="search-cont">
              <form onSubmit={serchUser}>
                <input
                  type="text"
                  className="search-user"
                  placeholder="search user.."
                  name="userName"
                ></input>
                <button className="search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="navigator">
          <ul>
            <li>
              <i class="fa-solid fa-house"></i>
            </li>
            <li>
            <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </li>
            <li>
              <i class="fa-solid fa-bell"></i>
            </li>
            <li>
              <Popover
                isOpen={isPopoverOpen}
                positions={["bottom", "left"]} // preferred positions by priority
                onClickOutside={() => setIsPopoverOpen(false)}
                content={
                  <div>
                    <UserPopOver />
                  </div>
                }
              >
                <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                  <i  class="fa-solid fa-user"></i>
                </div>
              </Popover>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
      <div>
        <Post
          name="Ashutosh"
          userDp="/img/ashu.jpg"
          url="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        />
        {posts.map((post) => {
          return (
            <Post
              name={post.owner.firstName}
              url={post.image}
              numbers={post.likes}
              userDp={post.owner.picture}
              date={post.publishDate}
            />
          );
        })}
        </div>
        <div>
        <Suggestion className="sugg-page"></Suggestion>
        </div>
      </div>
    </div>
  );
}
export default Rateit;
