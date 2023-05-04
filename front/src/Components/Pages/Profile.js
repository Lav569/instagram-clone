import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from '../Navbar/Navbar';
import demoimage from "../../Pictures/nature1.jpg";
import PostDetail from "./postdetails";
import Profilepic from "./Profilepic";
const Profile = () => {
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setChangePic] = useState(false);
  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
    }
  };
  const changeprofile = () => {
    if (changePic) {
      setChangePic(false)
    } else {
      setChangePic(true)
    }
  }
    useEffect(() => {
      fetch(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))._id}`,{
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
      }).then(res=>res.json())
      .then((result)=>{
        console.log(result)
        setPic(result.post);
        setUser(result.user)
        console.log(pic);
      });
    }, [])
    
  return (
    <div className='full_profile'>
        <Navbar />
        <div className='main_profile'>
            <div className='main_profile_header'>
                <div className='full_profile_pic_section'>
                    <div className='full_profile_pic' onClick={()=>changeprofile()}>
                        <img  src={user.photo ? user.photo :demoimage} alt="Full_profile image" id="Full_profile_image"></img>
                    </div>
                </div>
                <div className='profile_other_info'>
                    <div className='Profile_username'>
                        {JSON.parse(localStorage.getItem("user")).username}
                    </div>
                    <div className='Profile_post_follower'>
                        <span style={{"cursor":"auto"}}>{pic ? pic.length : "0"} Posts</span>
                        <span>{user.followers ? user.followers.length : "0"} followers</span>
            <span>{user.following ? user.following.length : "0"} following</span>
                    </div>
                    <div className='profile_full_name'>
                    {JSON.parse(localStorage.getItem("user")).name}
                    </div>
                </div>
            </div>
            <hr style={{width:"90%"}}/>
            <div className='main_profile_gallery'>
                {pic.map((pics)=>{
                    return <div className='main_profile_post'key={pics._id}>
                    <img src={pics.photo} style={{height:"250px",width:"250px"}} alt="profile_post" onClick={()=>toggleDetails(pics)}/>
                </div>
                })}
            </div>
            {show && <PostDetail item={posts} toggleDetails={toggleDetails} className="Post_details_show"/>} 
            {changePic && 
            <Profilepic changeprofile={changeprofile}/>}
          
        </div>
    </div>
  )
}
export default Profile;
