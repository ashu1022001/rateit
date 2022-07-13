import "./Rateit.css";
import React, { useState ,useContext} from "react";
import { useEffect } from "react";
import Post from "../post/Post";
import { useNavigate } from "react-router";

import Suggestion from "../suggestion/Suggestion";
import { onValue,ref as dbref, query, orderByChild, equalTo} from "firebase/database";

import { storage,database} from "../firebase/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Header from "../header/Header";
import { useLocation } from "react-router";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { LoadingContext } from "react-router-loading";
import { useSwipeable } from 'react-swipeable';


function Rateit() {
  const loadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  // const [currUser,setCurrUser] = useState("");
  
  

  // const useQuery=()=>{
  //    return new URLSearchParams(useLocation().search)
  // }

  
  // let currUserEmail =useQuery().get("email");

  // const user =query(dbref(database,'users'),orderByChild('email'),equalTo(currUserEmail))
 
 

  

  
 


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

    // onValue(user,(snapshot)=>{
    //   let data = snapshot.val();
    //   let currUserKey =(Object.keys(data))
    //   setCurrUser(data[currUserKey]);
    // })
    
  }, []);
  // localStorage.setItem("currUser",JSON.stringify(currUser));
  loadingContext.done();
  const handlers = useSwipeable({
    onSwipedUp:(e)=>{console.log(e)},
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true
  });
  return (
    <div {...handlers}>
      <Header ></Header>

      <div className="main-content">
        <div>
         
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                id ={post?.owner.id}
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
                caption = {false}
                name={'Ashutosh'}
                url={post}
                numbers=""
                userDp={`${"/img/userprofile.png"}`}
                date=""
              />
            );
          })}
        </div>
        <Suggestion  className="sugg-page"></Suggestion>
      </div>
    </div>
  );
}
export default Rateit;
