import react, { useState } from "react";
import './Signup.css'
import { Link } from "react-router-dom";
function SignUp() {
    const [email, setEmail]  = useState('');

    const handleSubmit = () => {
        setEmail('Golu');
    };


  return (
    <div>
      <div className="signup">
        <div className="signup-win">
          <div className="logo">
            <h3>
              <span> Rate<span className="it">it</span></span>
            </h3>
          </div>
          <div className="signup-form">
            <input type="email"   value={email} placeholder="Email" />
            <input type="text" placeholder="Full name"  />
            <input type="text" placeholder="Username"  />
            <input
              type="password"
              name=""
              id="password"
              placeholder="Password"
            />
            <button onClick={handleSubmit} className="btn" type="submit" id="signupbtn">
              Signup
            </button>
          </div>
          <div className="login">
            <p>
              Have an account? <Link to ='../Login'>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
