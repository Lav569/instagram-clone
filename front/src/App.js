import "./App.css";
import React,{ createContext,useState } from "react";
import Login from "./Components/Pages/LoginPage";
import SignUp from "./Components/Pages/SignUp";
import Home from "./Components/Pages/Home";
import Profile from "./Components/Pages/Profile";
// import Newpost from "./Components/Pages/Newpost";
import Newposts from "./Components/Pages/NewPosts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "./Context/logincontext";
import Modal from "./Components/Pages/Modal";
import Userprofile from "./Components/Pages/userprofile";
import Myfollowingpost from "./Components/Pages/Myfollowingpost";
function App() {
  const [userlogin,setuserlogin]=useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <LoginContext.Provider value={{setuserlogin,setModalOpen}}>
        <ToastContainer theme="dark"/>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          {/* <Route exact path="/login" element={<Login />}></Route> */}
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route  path="/home" element={<Home />}></Route>
          <Route  path="/myhome" element={<Myfollowingpost />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/profile/:userid" element={<Userprofile />}></Route>
          <Route  path="/newpost" element={<Newposts />}></Route>
        </Routes>
        {modalOpen && <Modal setModalOpen={setModalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;
//<Popup trigger={<Link className="item_list" ><MenuIcon style={{marginRight:"8px"}} />More</Link>} position="top right" style={{bottom:"1rem",position:"absolute"}}><a className="logout_popup" style={{marginLeft:"0px"}}><Link className="item_list_link" to='/'><LogoutIcon style={{marginLeft:"16px"}}/>Logout</Link></a></Popup>