import "./Rateit.css";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import Post from "../post/Post";
import { useNavigate } from "react-router";

import Suggestion from "../suggestion/Suggestion";
import {
  onValue,
  ref as dbref,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { storage, database } from "../firebase/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Header from "../header/Header";
import { useLocation } from "react-router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { LoadingContext } from "react-router-loading";
import { useSwipeable } from "react-swipeable";
import useUser from "../Store";
function Rateit() {
  const loadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  // const [currUser,setCurrUser] = useState("");

  // const useQuery=()=>{
  //    return new URLSearchParams(useLocation().search)
  // }

  const { currUser, updateCurrUser } = useUser();

  //displaying uploaded images
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // let subtitle;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currUser) {
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

      const userDetailsRef = query(
        dbref(database, "users"),
        orderByChild("email"),
        equalTo(currUser?.email)
      );

      onValue(userDetailsRef, (snapshot) => {
        const data = snapshot.val();
        const userDetails = data[currUser.uid];
        // console.log(userDetails);
        updateCurrUser({...userDetails, ...currUser});
      }, { onlyOnce: true });

    }
  }, [currUser.email]);
  // localStorage.setItem("currUser",JSON.stringify(currUser));
  loadingContext.done();
  return (
    <div>
      <Header />

      <div className="main-content">
        <div>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post?.owner.id}
                caption={post.text}
                name={post.owner.firstName}
                url={post.image}
                numbers={post.likes}
                userDp={post.owner.picture}
                date={post.publishDate}
              />
            );
          })}
          {imageList.map((post) => {
            return (
              <Post
                key={post.id}
                caption={false}
                name={"Ashutosh"}
                url={post}
                numbers=""
                userDp={`${"/img/userprofile.png"}`}
                date=""
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
