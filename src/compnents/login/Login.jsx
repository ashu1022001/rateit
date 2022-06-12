import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


import { APP_NAME } from '../../utils/common';


export const Login = () => {
    let navigate = useNavigate();
    const loginfn=(event)=>{
   
    event.preventDefault();
    navigate("/mainpage", { replace: true });
    
}
    return (
        <div>
        <div className="login">
        <div className="login-win">
            <div className="logo"><h3>Rate<span className='it'>it</span></h3></div>
           <div className="login-form">
    
            <form onSubmit={loginfn}>
                <input type="text" placeholder="username" id="username"/>
                <input type="password" name="" id="password" placeholder="password"/> 
                <button className='btn'type="submit">Login</button>
            </form>
        </div>
        <div className="signup">
            <p> <Link to='../Signup'>Don't have an account??</Link></p>
        </div>
       
        </div>
        
        </div>
        </div>
    )   
}

export default Login;
