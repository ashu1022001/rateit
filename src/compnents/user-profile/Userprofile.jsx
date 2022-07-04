import React, { useEffect, useState } from "react";
import Userpost from "../user-post/Userpost";
import "./Userprofile.css";
import { storage,db } from "../firebase/firebase";
import { getDownloadURL,ref ,listAll} from "firebase/storage";
import UploadProfile from "../uploadProfile/UploadProfile";
import useUser from "../Store";
import Modal from "react-modal";
import Header from "../header/Header";
import { database } from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen ,faXmark} from "@fortawesome/free-solid-svg-icons";
import { push ,ref as dbref,query,orderByChild,equalTo,onValue,update} from "firebase/database";

function Userprofile() {
  const currUser = useUser(state=> state.currUser)
  const userName = currUser.userName;
  
  const [currUserKey,setCurrUserKey] =useState([]);
  // const [dbProfilePicUrl,setDbProfilePicUrl] = useState("");
  const user =query(dbref(database,'users'),orderByChild('email'),equalTo(currUser.email))


  const profilePicRef = ref(storage,`images/profilepics/${userName}/`)

  
  const [modalIsOpen, setIsOpen] = React.useState(false);
    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        height: "200px",
        maxWidth: "400px",
        minWidth: "300px",
        padding: "0",
        display: "flex",
        flexDirection: "coloumn",
        // right: "auto",
        // bottom: "auto",
        // marginRight: "-50%",
        // transition: "2s ease",
        transform: "translate(-50%, -50%)",
      },
    };

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      // subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

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
      onValue(user,(snapshot)=>{
        let data = snapshot.val();
         setCurrUserKey((Object.keys(data)))
        
      })
      listAll(profilePicRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url)=>{
            update(dbref(database,`users/${currUserKey}`),{
              profilePicUrl:url
            })
          })
          
        });
      });
      


      
      
  }, []);
  const profilePic = currUser.profilePicUrl;
  console.log(currUser)


  return (
    <div>
    <Header/>
  
    <div className="user-profile-container">
    
      <div className="user-info">
        <span className="user-image">
          <img src={`${profilePic || "/img/userprofile.png"} `} />
        </span>
        <span className="user-profile-detail">
          
            <span><h3>{userName}</h3></span>
            <span>
              <FontAwesomeIcon onClick={openModal} icon={faUserPen}/>
              <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Upload"
            >
              <FontAwesomeIcon
                icon={faXmark}
                onClick={closeModal}
                fontSize={20}
              />
              <UploadProfile/>
            </Modal>
            </span>
          
        </span>
      </div>
      <div className="user-posts">
        {userPost.map((post) => {
          return (
            <Userpost
              name={userName}
              picture={`${profilePic || "/img/userprofile.png"} `}
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
