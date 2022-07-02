import React from 'react'
import "../searchUser/SearchUser.css"
import Tippy from "@tippyjs/react";
import{useState} from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCirclePlus } from '@fortawesome/free-solid-svg-icons';




function SearchUser(props) {

    const [followbtn,setFollowbtn] = useState(true);
    const [content,setContent] = useState("Add");
    
    const followFn=()=>{
      setFollowbtn(false)
      setContent("Added")
    }



  return (
    <div className="search-user-container">
    <span className="sugg-user-cont">
      <span className="sugg-user-img">
        <img src={props.imgUrl} alt="user"></img>
      </span>
      <span>
        <h6 >{props.fname + props.lname}</h6>
      </span>
      </span>
      <span>
        <Tippy content={content}>
          <button onClick={followFn}>{followbtn ?<FontAwesomeIcon icon={faCirclePlus} fontSize={20}/>:<FontAwesomeIcon icon={faCheck} fontSize={20}/>}</button>
  </Tippy>
      </span>
    </div>
  )
}

export default SearchUser