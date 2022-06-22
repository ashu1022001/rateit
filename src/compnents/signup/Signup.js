import react, { useState,useEffect } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import {toast} from "react-toastify"
import {collection, getDocs,addDoc} from "firebase/firestore"
import { async } from '@firebase/util'
function SignUp() {


  
  const handleSubmit =  async (e) => {
    e.preventDefault();


    const email = e.target.elements.email.value.trim();
    const name = e.target.elements.name.value.trim();
    const userName = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success(user)
    } catch (error) {
      toast.error(error.message);
    }
 


  };


  return (
    <div>
    <div className="container">
    <img src="/img/login-bg.jpg" alt="back-ground"></img>
      <div className="signupP">
        <div className="signup-win">
        
          <div className="logo">
            <h3>
              <span>
                Rate<span className="it">it</span>
              </span>
            </h3>
          </div>
          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <input type="email"  placeholder="Email" name="email"></input>
              <input type="text" placeholder="Full name"  name="name"></input>
              <input type="text" placeholder="Username" name="username"/>
              <input type="password" name="password" id="pass" placeholder="Password" ></input>
              <button className="btn" type="submit" id="signupbtn">
                Signup
              </button>
            </form>
          </div>
          <div className="login">
            <p>
              Have an account? <Link to="/">Login</Link> 
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SignUp;
