import React, { useEffect, useState } from "react";
import SearchUser from "../searchUser/SearchUser";
import { Link } from "react-router-dom";
import { Popover } from "react-tiny-popover";
import { useNavigate } from "react-router-dom";
import UserPopOver from "../pop-overs/UserPopOver";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Upload from "../uplaod/Upload";
import { faArrowUpFromBracket, faBars, faBell, faDeleteLeft, faHouse, faUser, faX, faXmark } from "@fortawesome/free-solid-svg-icons";

function Header() {
  let navigate = useNavigate();

  const [searchUserInput, setSearchUserInput] = useState("");

  const [menuBtnClicked, setMenuBtnClicked] = useState(false);
  const [users, setUsers] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

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


  useEffect(()=>{
    fetch("https://dummyapi.io/data/v1/user?limit=100", {
        headers: {
          "app-id": "62adde4072c63ad0c100fa56",
        },
      })
        .then((user) => user.json())
        .then((user) => setUsers(user.data));

  },[])

  return (
    <div className={`header ${menuBtnClicked && "new-header"} `}>
      <div className="head">
        <div className="search-bar">
          <div className="search-cont">
            <input
              type="text"
              className="search-user"
              placeholder="search user.."
              name="searchInput"
              value={searchUserInput}
              onChange={(e) => {
                setSearchUserInput(e.target.value);
              }}
            ></input>
          </div>
          {searchUserInput && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setSearchUserInput("");
              }}
            >
            <FontAwesomeIcon icon={faDeleteLeft}/>
            </button>
          )}
        </div>

        <div className={`${searchUserInput && "searched-cont"}`}>
          {users
            .filter((val) => {
              if (searchUserInput === "") {
                return;
              } else if (
                (
                  val.firstName.toLowerCase() + val.lastName.toLowerCase()
                ).includes(searchUserInput.toLowerCase())
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
      <div className="logo">
        <h3>
          <span>Rate</span>
          <span className="logoit">it</span>
        </h3>
      </div>
      <div className={` ${menuBtnClicked && "new-navigator"} navigator`}>
        <ul>
          <li>
          
            <FontAwesomeIcon  onClick={() => {
              navigate("/rateit");
            }}
            
            icon={faHouse} />
             
            
          </li>
          <li>
            <FontAwesomeIcon
              onClick={openModal}
              icon={faArrowUpFromBracket}

            />
            <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Upload"
            >
              <Upload></Upload>
            </Modal>
          </li>
          <li>
            <FontAwesomeIcon icon={faBell}/>
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
                <FontAwesomeIcon icon={faUser}/>
              </div>
            </Popover>
          </li>
        </ul>
      </div>
      <div
        className="menu-btn"
        onClick={() => setMenuBtnClicked(!menuBtnClicked)}
      >
        {(!menuBtnClicked && <FontAwesomeIcon icon={faBars}/>) ||
          (menuBtnClicked && <FontAwesomeIcon icon={faXmark} fontSize={30}/>)}
      </div>
    </div>
  );
}

export default Header;
