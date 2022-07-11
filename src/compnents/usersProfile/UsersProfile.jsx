import React, { useEffect, useState, useContext } from "react";
import Userpost from "../user-post/Userpost";

import Header from "../header/Header";

import { LoadingContext } from "react-router-loading";
import { useLocation, useParams } from "react-router";

function Usersprofile() {
  const loadingContext = useContext(LoadingContext);
  // const currUser = useUser((state) => state.currUser);
  // const userName = currUser.userName;
  const { userId } = useParams();
  
  // const [currUserKey, setCurrUserKey] = useState([]);
  // const [dbProfilePicUrl,setDbProfilePicUrl] = useState("");

  // const profilePicRef = ref(storage, `images/profilepics/${userName}/`);

  const [expand, setExpand] = useState(false);

  const url = `https://dummyapi.io/data/v1/user/${userId}/post?limit=100`;

  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    fetch(url, {
      headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      },
    })
      .then((posts) => posts.json())
      .then((posts) => posts)
      .then((posts) => setUserPost(posts.data));

    // onValue(user, (snapshot) => {
    //   let data = snapshot.val();
    //   setCurrUserKey(Object.keys(data));
    // });

    // listAll(profilePicRef).then((res) => {
    //   res.items.forEach((item) => {
    //     getDownloadURL(item).then((url) => {
    //       push(dbref(database, `users/${currUserKey}/profilePicUrl`), url);
    //     });
    //   });
    // });
  }, []);
  // const profilePic = currUser.profilePicUrl;
  loadingContext.done();
  const user = userPost[0];

  return (
    <div>
      <Header />

      <div className="user-profile-container">
        <div className={"user-info"}>
          <span className="user-image">
            <img src={user?.owner.picture || "img/userprofile.png"} alt="profile" />
          </span>
          <span className="user-profile-detail">
            <span>
              <h3>{user?.owner.firstName + user?.owner.lastName || "User"}</h3>
            </span>
          </span>
        </div>
        <div className="expand-toggle">
          <input
            type="checkbox"
            onChange={() => setExpand(!expand)}
            id="switch"
          />
          <label className="toggle-label" for="switch"></label>
        </div>
        <div className={` ${expand ? "expand" : "user-posts"}`}>
          {userPost.map((post) => {
            return (
              <Userpost
                key={post.id}
                name={post.owner.firstName + post.owner.lastName}
                picture={post.owner.picture}
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

export default Usersprofile;
