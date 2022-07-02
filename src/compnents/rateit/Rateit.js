import "./Rateit.css";
import React, { useState } from "react";
import { useEffect } from "react";
import Post from "../post/Post";
import Suggestion from "../suggestion/Suggestion";


import { useNavigate } from "react-router-dom";

import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Header from "../header/Header";

function Rateit() {
  let navigate = useNavigate();

  //displaying uploaded images
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // let subtitle;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/post?limit=10", {
      headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      },
    })
      .then((user) => user.json())
      .then((user) => setPosts(user.data));

    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <Header></Header>

      <div className="main-content">
        <div>
          {imageList.map((post) => {
            return (
              <Post name="ashutosh" url={post} numbers="" userDp="" date="" />
            );
          })}
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
        <Suggestion className="sugg-page"></Suggestion>
      </div>
    </div>
  );
}
export default Rateit;
