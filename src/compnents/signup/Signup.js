import "./Signup.css";
import useContext from "react";

import { Link ,useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase/firebase";
import { push, ref } from "firebase/database";
import { toast } from "react-toastify";
import { LoadingContext } from "react-router-loading";

function SignUp() {
  const loadingContext = useContext(LoadingContext);
  let navigate = useNavigate();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value.trim();
    const name = e.target.elements.name.value.trim();
    const userName = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();

    try {
       await createUserWithEmailAndPassword(auth, email, password,).then
       
      ((userCedential)=>{
        localStorage.clear();
       localStorage.setItem("email",email)
       navigate(`/rateit?email=${email}`, { replace: true });
        const user = userCedential.user;
      push(ref(database, "users"), {
        email: email,
        name: name,
        userName: userName,
      });
      toast.success("Account added")


      })
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  loadingContext.done();

  return (
    <div>
      <div className="login-container">
        <div className="signup-img">
          <img src="/img/login-bg.jpg" alt="back-ground"></img>
        </div>

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
                <input type="email" placeholder="Email" name="email"></input>
                <input type="text" placeholder="Full name" name="name"></input>
                <input type="text" placeholder="Username" name="username" />
                <input
                  type="password"
                  name="password"
                  id="pass"
                  placeholder="Password"
                ></input>
                <button className="btn" type="submit" id="signupbtn">
                  Signup
                </button>
              </form>
            </div>
            <div>
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
