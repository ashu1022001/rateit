// import logo from "./logo.svg";
import "./App.css";
import SignUp from "./compnents/signup/Signup";
import Login from "./compnents/login/Login";
import Rateit from "./compnents/rateit/Rateit";
import Some from "./compnents/some/Some";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer theme="dark" position="top-left" autoClose={false}  limit={1} ></ToastContainer>

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/rateit" element={<Rateit />} />
        <Route path="/some" element={<Some />}></Route>
        <Route element={<Some />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
