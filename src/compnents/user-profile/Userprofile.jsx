import React, { useEffect, useState } from "react";
import Userpost from "../user-post/Userpost";
import "./Userprofile.css";

function Userprofile() {
  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    fetch(
      "https://dummyapi.io/data/v1/user/60d0fe4f5311236168a109ca/post?limit=10",
      {
        headers: {
          "app-id": "62adde4072c63ad0c100fa56",
        },
      }
    )
      .then((posts) => posts.json())
      .then((posts) => posts)
      .then((posts) => setUserPost(posts.data));
  }, []);
  let picture;
  let name;
  userPost.map(
    (post) => (
      (picture = post.owner.picture),
      (name = post.owner.firstName + post.owner.lastName)
    )
  );

  return (
    <div>
    <div>
  <i class="fa-solid fa-arrow-left"></i>
    </div>
    <div className="user-profile-container">
    
      <div className="user-info">
        <span className="user-image">
          <img src={picture} />
        </span>
        <span className="user-profile-detail">
          
            {" "}
            <span><h3>{name}</h3></span>{" "}
            <span>
              <i class="fa-solid fa-user-pen"></i>
            </span>
          
        </span>
      </div>
      <div className="user-posts">
        {userPost.map((post) => {
          return (
            <Userpost
              name={name}
              picture={picture}
              caption={post.text}
              date={post.publishDate}
              image={post.image}
              reaction={post.likes}
            />
          );
        })}
      </div>
    </div>
    </div>
  );
}

export default Userprofile;
