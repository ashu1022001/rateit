// import logo from "./logo.svg";
import "./App.css";
import SignUp from "./compnents/signup/Signup";
import Login from "./compnents/login/Login";
import MainPage from "./compnents/main-page/Main-page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element ={<MainPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
