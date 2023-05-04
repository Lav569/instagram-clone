import React,{useContext} from "react";
import { useEffect, useState } from "react";
import "./Navbar.css";
import Popup from "reactjs-popup";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginContext } from "../../Context/logincontext";
const Navbar = () => {
  const { setModalOpen } = useContext(LoginContext);
  // const [imageFiles, setImageFiles] = useState([]);
  // const [images, setImages] = useState([]);
  // const [videoFiles, setvideoFiles] = useState([]);
  // const [videos, setvideos] = useState([]);
  // const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
  // const videoTyperegex= /video\/(mp4|mkv|avi)/gm;
//   const senderrormessage=(message)=>{
//     toast.error(message);
// }
  // const changeHandler = (e) => {
  //   const { files } = e.target;
  //   const validImageFiles = [];
  //   const validvideofiles=[];
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     if (file.type.match(imageTypeRegex)) {
  //       validImageFiles.push(file);
  //     }
  //     else if(file.type.match(videoTyperegex)){
  //       validvideofiles.push(file);
  //     }
  //     else{
  //     senderrormessage(`${i}th file is not suitable`);
  //     }
  // }
  //   if (validImageFiles.length) {
  //     setImageFiles(validImageFiles);
  //   }
  //   if (validvideofiles.length){
  //     setvideoFiles(validvideofiles);
  //   }
  // };
  // useEffect(() => {
  //   const images = [], fileReaders = [];
  //   const videos = [], fileReaderss = [];
  //   let isCancel = false;
  //   let iscancel=false;
  //   if (imageFiles.length) {
  //     imageFiles.forEach((file) => {
  //       const fileReader = new FileReader();
  //       fileReaders.push(fileReader);
  //       fileReader.onload = (e) => {
  //         const { result } = e.target;
  //         if (result) {
  //           images.push(result)
  //         }
  //         if (images.length === imageFiles.length && !isCancel) {
  //           setImages(images);
  //         }
  //       } 
  //       fileReader.readAsDataURL(file);
  //     })
  //   };
  //   if(videoFiles.length){
  //     videoFiles.forEach((file)=>{
  //       const fileReader = new FileReader();
  //       fileReaderss.push(fileReader);
  //       fileReader.onload=(e)=>{
  //         const {result}=e.target;
  //         if(result){
  //           videos.push(result)
  //         }
  //         if(videos.length === videoFiles.length && !iscancel){
  //           setvideos(videos);
  //         }
  //       }
  //       fileReader.readAsDataURL(file);
  //     })
  //   }
  //   // return () => {
  //   //   isCancel = true;
  //   //   iscancel=true;
  //   //   fileReaders.forEach(fileReader => {
  //   //     if (fileReader.readyState === 1) {
  //   //       fileReader.abort()
  //   //     }
  //   //   });
  //   //    fileReaderss.forEach(fileReader => {
  //   //     if (fileReader.readyState === 1) {
  //   //       fileReader.abort()
  //   //     }
  //   //   })
  //   // }
  // }, [imageFiles,videoFiles]);
  return (
    <div className="Navbar">
      <div className="left_side">
        <div className="instagram_title">
          <Link to="/home">Instagram</Link>
        </div>
        <ul className="left_item">
          <li className="item_list">
            <Link className="item_list_link" to="/home">
              <HomeIcon style={{ marginRight: "8px" }} />
              Home
            </Link>
          </li>
          {/* <li className="item_list">
            <Link className="item_list_link" to="#">
              <SearchIcon style={{ marginRight: "8px" }} />
              Search
            </Link>
          </li> */}
          <li className="item_list"><Link className="item_list_link" to="/newpost"><AddBoxIcon style={{marginRight:"8px"}}/>Create</Link></li> 
          {/* <Popup
            trigger={
              <Link
                className="item_list"
                style={{ color: "black", textDecoration: "none" }}
                offsetX="90"
              >
                <AddBoxIcon style={{ marginRight: "8px" }} />
                Create
              </Link>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <div className="new_post_header_section">
                    <div className="new_post_header"> Create New Post </div>
                    <button className="new_post_save">Post</button>
                </div>
                <hr style={{width:"90%",height:"2px"}}/>
                <div className="new_post_content">
                <input
            type="file"
            id="file"
            onChange={changeHandler}
            accept="image/*,video/*"
            multiple
          />
           {
        images.length > 0?
          <div >
            {
              images.map((image, idx) => {
                return  <img src={image} alt="" style={{height:"100px",width:"100px",margin:"2px"}} key={idx}/>
              })
            }
          </div> : null
      }
      {
        videos.length > 0?
          <div >
            {
              videos.map((video, idx) => {
                return  <video width="320" height="240" controls>
                            <source src={video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
            })
      }
          </div> : null
      }
                </div>
                <hr style={{width:"90%",height:"2px"}}/>
                <div className="new_post_footer">
                    <textarea type="text" placeholder="Write caption of your post" style={{border:"none",outline:"none"}}/>
                </div>
              </div>
            )}
          </Popup> */}
          {/* <li className="item_list">
            <Link className="item_list_link" to="#">
              <MovieFilterIcon style={{ marginRight: "8px" }} />
              Message
            </Link>
          </li> */}
          <li className="item_list">
            <Link className="item_list_link" to="/myhome">
              <FavoriteBorderIcon style={{ marginRight: "8px" }} />
              Myfallowing Post
            </Link>
          </li>
          <li className="item_list">
            <Link className="item_list_link" to="/profile">
              <div className="side_profile_icon">
                <AccountCircleIcon id="demo_profile" />{" "}
              </div>
              Profile
            </Link>
          </li>
          <Popup
            trigger={
              <Link
                className="item_list"
                id="sidemenu_more"
                style={{ color: "black" }}
              >
                <MenuIcon />
                More
              </Link>
            }
            position="top center"
            style={{ bottom: "1rem", position: "absolute" }}
          >
            <a
              className="logout_popup"
              style={{ marginLeft: "0px", color: "black" }}
            >
              <Link className="item_list_link" to={""} onClick={()=>setModalOpen(true)}>
                <LogoutIcon style={{ marginLeft: "16px" }} />
                Logout
              </Link>
                
            </a>
          </Popup>
        </ul>
      </div>
      <div className="main_home_side_line"></div>
    </div>
  );
};
export default Navbar;
