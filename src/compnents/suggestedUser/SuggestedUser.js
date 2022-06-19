import React from 'react'
import ReactTooltip from 'react-tooltip';
import {Link} from "react-router-dom"
import "./SuggestedUser.css"
export default function SuggestedUser(props) {
  return (
   <div className='sugg-user-cont'>
   <span className='sugg-user-img'><img src ={props.imgUrl}></img></span>
   <span><h6 >{props.fname+props.lname}</h6></span>
   
   <span ><Link to = ""><i class="fa-solid fa-circle-plus" data-tip="follow" ></i></Link> </span>
   <ReactTooltip place="top" type="dark" effect="solid"/>
   </div>
  )
}

