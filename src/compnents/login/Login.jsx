import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

import { APP_NAME } from "../../utils/common";
import { toast } from "react-toastify";
import { useState } from "react";
import { async } from "@firebase/util";

export const Login = () => {
 

 

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  

  

  let navigate = useNavigate();
  const loginfn = async (e) => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem(email,setPassword);
       navigate("/rateit", { replace: true });
    } catch (error) {
      toast.error(error.message)
    }
    
  };

  return (
    <div>
      <div className="container">
        <img src="/img/login-bg.jpg"></img>
        <div className="login">
          <div className="login-win">
            <div className="logo">
              <h3>
                <span>
                  Rate<span className="it">it</span>
                </span>
              </h3>
            </div>
            <div className="login-form">
              <input
               
                placeholder="Email"
                name="useremail"
                onInput={(e) => {setEmail(e.target.value)}}
              />
              <input
                type="password"
                name="pass"
                placeholder="Password"
                onInput={(e) => {setPassword(e.target.value)}}
              />
              <button
                onClick={loginfn}
                className="btn"
                type="submit"
                disabled={false}
              >
                Login
              </button>
            </div>
            <div className="signup">
              <p>
                {" "}
                <Link to="../signup">Don't have an account??</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
