import React, {  useState } from "react";

import SearchBar from "../searchBar/SearchBar";
import { Popover } from "react-tiny-popover";
import { useNavigate } from "react-router-dom";
import UserPopOver from "../pop-overs/UserPopOver";
import Modal from "react-modal";
// import useUser from "../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Upload from "../uplaod/Upload";
import {
  faArrowUpFromBracket,
  faBars,
  faBell,
  faArrowLeft,
  faHouse,
  faSearch,
  faUser,

  faXmark,
} from "@fortawesome/free-solid-svg-icons";


function Header() {
  // const currUser = useUser(state=>state.currUser);
 
  let navigate = useNavigate();

  const [menuBtnClicked, setMenuBtnClicked] = useState(false);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalTwoIsOpen, setIsTwoOpen] = React.useState(false);
  

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

  const customStyles2 = {
    content: {
      // top: "15%",
      // left: "50%",
      position: "fixed",
      inset:"0",
      height: "100vh",
      width: "100vw",
      padding: "0",
      display: "flex",
      flexDirection: "coloumn",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transition: "2s ease",
      // transform: "translateX(-50%)",
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

  return (
    <div className={`header ${menuBtnClicked && "new-header"} `}>
      <div className="header-search">
      <SearchBar />
      </div>
      <div className="logo"
      
      onClick={()=>
        {navigate("/rateit")}}>
        <h3>
          <span>Rate</span>
          <span className="logoit">it</span>
        </h3>
      </div>
      <div className={` ${menuBtnClicked && "new-navigator"} navigator`}>
        <ul>
          <li>
            <FontAwesomeIcon
              onClick={() => {
                navigate(`/rateit`);
              }}
              icon={faHouse}
            />
          </li>
          <li className="search-icon">
            <FontAwesomeIcon onClick={()=>setIsTwoOpen(true)} icon={faSearch} />
            <Modal
              isOpen={modalTwoIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={()=>{setIsTwoOpen(false)
              }}
              style={customStyles2}
              contentLabel="search"
            >
            <div className="modal-search">
            <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={()=>{setIsTwoOpen(false)
                }}
                fontSize={20}
              />
            <SearchBar/>
              </div>
            </Modal>
          </li>
          <li>
            <FontAwesomeIcon onClick={openModal} icon={faArrowUpFromBracket} />
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
              <Upload />
            </Modal>
          </li>
          <li>
            <FontAwesomeIcon icon={faBell} />
          </li>
          <li>
            <Popover
              isOpen={isPopoverOpen}
              positions={["bottom", "left"]} // preferred positions by priority
              onClickOutside={() => setIsPopoverOpen(false)}
              content={
                <div>
                  <UserPopOver  />
                </div>
              }
            >
              <div onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Popover>
          </li>
        </ul>
      </div>
      <div
        className="menu-btn"
        onClick={() => setMenuBtnClicked(!menuBtnClicked)}
      >
        {(!menuBtnClicked && <FontAwesomeIcon icon={faBars} />) ||
          (menuBtnClicked && <FontAwesomeIcon icon={faXmark} fontSize={30} />)}
      </div>
    </div>
  );
}

export default Header;
