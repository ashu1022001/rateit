import React, { useEffect, useState, useContext } from "react";
import Userpost from "../user-post/Userpost";
import "./Userprofile.css";
import { storage } from "../firebase/firebase";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import UploadProfile from "../uploadProfile/UploadProfile";
import useUser from "../Store";
import Modal from "react-modal";
import Header from "../header/Header";
import { database } from "../firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPen,
  faXmark,
  faExpandArrowsAlt,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import {
  push,
  ref as dbref,
  query,
  orderByChild,
  equalTo,
  onValue,
  update,
  set as dbset,
} from "firebase/database";
import Post from "../post/Post";
import { LoadingContext } from "react-router-loading";

function Userprofile() {
  const loadingContext = useContext(LoadingContext);

  const [profilePicRef, setProfilePicRef] = useState("");
  const { currUser } = useUser();

  const [expand, setExpand] = useState(false);
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

      transform: "translate(-50%, -50%)",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {}

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
  }, []);

  loadingContext.done();

  return (
    <div>
      <Header />

      <div className="user-profile-container">
        <div className={"user-info"}>
          <span className="user-image">
            <img src={currUser?.profilePicUrl} alt="profile" />
          </span>
          <span className="user-profile-detail">
            <span>
              <h3>{currUser?.userName}</h3>
            </span>
            <span>
              <FontAwesomeIcon onClick={openModal} icon={faUserPen} />
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
                <UploadProfile />
              </Modal>
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
                name={"Ashutosh Singh"}
                picture={`${"/img/userprofile.png"} `}
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
