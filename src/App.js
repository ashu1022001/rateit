// import logo from "./logo.svg";
import "./App.css";
import SignUp from "./compnents/signup/Signup";
import Login from "./compnents/login/Login";
import MainPage from "./compnents/main-page/Main-page";
import Some from "./compnents/some/Some";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ReactTooltip from 'react-tooltip';

function App() {
  return (
    <>
    <ToastContainer theme="dark" position="top-left" autoClose={false}  limit={1} ></ToastContainer>
    <ReactTooltip/>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/some" element={<Some />}></Route>
        <Route element={<Some />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
