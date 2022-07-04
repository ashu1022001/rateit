import "./Rateit.css";
import React, { useState } from "react";
import { useEffect } from "react";
import Post from "../post/Post";
import create from "zustand";
import Suggestion from "../suggestion/Suggestion";
import { getDatabase,onValue,ref as dbref, query, orderByChild, equalTo, get, limitToFirst, DataSnapshot } from "firebase/database";

import { storage,db,database} from "../firebase/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Header from "../header/Header";
import { useLocation } from "react-router";

function Rateit() {

  const [currUser,setCurrUser] = useState("");
  
  

  const useQuery=()=>{
     return new URLSearchParams(useLocation().search)
  }

  
  let currUserEmail =useQuery().get("email");

  const user =query(dbref(database,'users'),orderByChild('email'),equalTo(currUserEmail))
 
 

  

  
 


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

    onValue(user,(snapshot)=>{
      let data = snapshot.val();
      let currUserKey =(Object.keys(data))
      setCurrUser(data[currUserKey]);
    })

  }, [localStorage]);
  localStorage.setItem("currUser",JSON.stringify(currUser));

  return (
    <div>
      <Header ></Header>

      <div className="main-content">
        <div>
          {imageList.map((post) => {
            return (
              <Post
               
                name={currUser.userName}
                url={post}
                numbers=""
                userDp={`${currUser.profilePicUrl || "/img/userprofile.png"}`}
                date=""
              />
            );
          })}
          {posts.map((post) => {
            return (
              <Post
                currUser = {currUser}
                name={post.owner.firstName}
                url={post.image}
                numbers={post.likes}
                userDp={post.owner.picture}
                date={post.publishDate}
              />
            );
          })}
        </div>
        <Suggestion currUser={currUser} className="sugg-page"></Suggestion>
      </div>
    </div>
  );
}
export default Rateit;
