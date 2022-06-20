import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { APP_NAME } from "../../utils/common";
import { toast } from "react-toastify";
import { useState } from "react";

export const Login = () => {

    const [password, setPassword] = useState('');

  let navigate = useNavigate();
  const loginfn = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    const userString = localStorage.getItem(username);
    const user = JSON.parse(userString);

    if (!localStorage.getItem(username) || password !== user.password) {
      toast.error("Invalid credentials");
    }
    if (password === user.password) {
      navigate("/rateit", { replace: true });
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
               <span>Rate<span className="it">it</span></span> 
              </h3>
            </div>
            <div className="login-form">
              <form onSubmit={loginfn}>
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  id="username"
                />
                <input
                  type="password"
                  name="pass"
                  id="passKey"
                  placeholder="Password"
                  onInput={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <button className="btn" type="submit" disabled={false}>
                  Login
                </button>
              </form>
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
