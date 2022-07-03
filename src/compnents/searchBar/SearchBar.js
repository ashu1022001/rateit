import React ,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faDeleteLeft, } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import SearchUser from "../searchUser/SearchUser";

function SearchBar() {
    const [users, setUsers] = useState([]);
    const [searchUserInput, setSearchUserInput] = useState("");


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
  )
}

export default SearchBar