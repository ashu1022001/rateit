import React, { useState } from "react";
import img from "../img/ashu.jpg";
import './Post.css';
import { useEffect } from "react";

function Post(props) {

 

  
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [currentRating, setCurrentRating] = useState(0);
  const [tempCurrentRating, setTempCurrentRating] = useState(0);


  const ratingChanged = (ratingIndex) => {
    setCurrentRating(ratingIndex + 1);
  }
  
  const hoveredStar = (starIndex) => {
    setTempCurrentRating(starIndex + 1);
  };

  return (
    <div className="content">
      <div className="picture">
        <img src={props.url} alt="img"></img>
      </div>
      <div id="interaction">
        <span className="uname">{props.id}</span>
        <ul onMouseOut={() => setTempCurrentRating(0)}>
          {ratings.map((rating, index) => {
            return (
              <li  className="rating-10" onMouseOver={() => hoveredStar(index)} onClick={() => ratingChanged(index)} >
                <i className={`fa-regular ${ (index < currentRating  || index < tempCurrentRating ) ?  'active-star': ''} fa-star`}></i>
                <span> {rating} </span>
              </li>
            )
          })}
        </ul>
        <span id="urated"></span>
      </div>
    </div>
  );
}
export default Post;





 //     let ratings = document.getElementsByClassName("rating-10");
  //     // let totalRating=ratings.length;
  //     // let inter= document.getElementById('interaction');
  //     let uRated = document.getElementById("urated");
  //     let stars = document.getElementsByClassName("fa-star");
  //     const searchUser = document.getElementById("search-user");
  //     const searchBtn = document.getElementById("search-btn");

  //     let clicked = false;
  //     for (let i = 0; i < 10; i++) {
  //       ratings[i].addEventListener("click", () => {
  //         clicked = true;
  //         for (let i = 0; i < 10; i++) {
  //           stars[i].style.color = "white";
  //         }
  //         let rated = ratings[i].value;
  //         uRated.innerHTML = `you have rated${rated}`;
  //         for (let i = 0; i < rated; i++) {
  //           stars[i].style.color = "blue";
  //         }
  //       });

  //       ratings[i].addEventListener("mouseover", () => {
  //         if (!clicked) {
  //           let rated = ratings[i].value;
  //           for (let i = 0; i < rated; i++) {
  //             stars[i].style.color = "blue";
  //           }
  //         }
  //       });

  //       ratings[i].addEventListener("mouseout", () => {
  //         if (!clicked) {
  //           for (let i = 0; i < 10; i++) {
  //             stars[i].style.color = "white";
  //           }
  //         }
  //       }, []);
  //     }

  //     // search btn

  //     searchBtn.addEventListener("click", () => {
  //       console.log(searchUser.value);
  //     });
  //   });
 