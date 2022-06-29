import "./Rateit.css";
import React, { useState } from "react";
import "https://kit.fontawesome.com/fe838ae10b.js";
import { useEffect } from "react";
import Post from "../post/Post";
import Suggestion from "../suggestion/Suggestion";
import SearchUser from "../searchUser/SearchUser";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import UserPopOver from "../pop-overs/UserPopOver";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Upload from "../uplaod/Upload";
import { toast } from "react-toastify";
import { storage } from "../firebase/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function Rateit() {
  let navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      height: "200px",
      width: "400px",
      display: "flex",
      flexDirection: "coloumn",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transition: "2s ease",
      transform: "translate(-50%, -50%)",
    },
  };

  //displaying uploaded images
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/post?limit=10", {
      headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      },
    })
      .then((user) => user.json())
      .then((user) => setPosts(user.data));

    fetch("https://dummyapi.io/data/v1/user?limit=100", {
      headers: {
        "app-id": "62adde4072c63ad0c100fa56",
      },
    })
      .then((user) => user.json())
      .then((user) => setUsers(user.data));

    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  const [searchUserInput, setSearchUserInput] = useState("");

  // const searchUser = (e) => {
  //   e.preventDefault();
  //   const user = e.target.elements.userName.value.trim();
  //   if (user) {
  //     toast.error(`no user found with ${user}`);
  //   }
  // };
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
          <div className="search-bar">
            <div className="search-cont">
              {/*<form onSubmit={searchUser}>*/}
              <input
                type="text"
                className="search-user"
                placeholder="search user.."
                onChange={(e) => {
                  setSearchUserInput(e.target.value);
                }}
              ></input>

              {/*<button className="search-btn">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              </form>*/}
            </div>
          </div>
        </div>
        <div className="navigator">
          <ul>
            <li>
              <i
                class="fa-solid fa-house"
                onClick={() => {
                  navigate("/rateit");
                }}
              ></i>
            </li>
            <li>
              <i
                onClick={openModal}
                class="fa-solid fa-arrow-up-from-bracket"
              ></i>
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Upload"
              >
                {/* <h2>Rateit</h2>
  <button onClick={closeModal}>close</button>*/}

                <Upload></Upload>
              </Modal>
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
                  <i class="fa-solid fa-user"></i>
                </div>
              </Popover>
            </li>
          </ul>
        </div>
      </div>
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
        <div>
          <Suggestion className="sugg-page"></Suggestion>
        </div>
        <div className={`${searchUserInput && "searched-cont"}`}>
          {users
            .filter((val) => {
              if (searchUserInput === "") {
                return;
              } else if (
                val.firstName
                  .toLowerCase()
                  .includes(searchUserInput.toLowerCase())
              ) {
                return val;
              }
           
            })
            .map((user) => {
              return (
              
               <SearchUser
                  fname={user.firstName}
                  lname={user.lastName}
                  imgUrl={user.picture}
                ></SearchUser>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Rateit;
