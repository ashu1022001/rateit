import "./Main-page.css";
import React, { useState } from "react";
import "https://kit.fontawesome.com/fe838ae10b.js";
import { useEffect } from "react";
import Post from "../post/Post";
import Suggestion from "../suggestion/Suggestion";
import { Link } from "react-router-dom";

function MainPage() {
  const [posts, setPosts] = useState([]);
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
        <div className="head">
          <div className="logo">
            Rate<span className="logoit">it</span>
          </div>
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
              <i class="fa-solid fa-bell"></i>
            </li>
            <li>
              <Link to="/">
                <i class="fa-solid fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <Post
        name="Ashutosh"
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
      <Suggestion className="sugg-page"></Suggestion>
    </div>
  );
}
export default MainPage;
