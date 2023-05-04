import React, { useEffect,useState } from "react";
import "./Profile.css";
import Navbar from '../Navbar/Navbar';
import demoimage from "../../Pictures/nature1.jpg";
import PostDetail from "./postdetails";
import { useParams } from "react-router-dom";
const Userprofile = () => {

    const [pic, setPic] = useState([]);
    const { userid } = useParams();
    const [isFollow, setIsFollow] = useState(false);
    const [user, setUser] = useState("");
    const [posts, setPosts] = useState([]);

    const followUser = (userId) => {
      fetch("http://localhost:5000/follow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsFollow(true);
        });
    };
    
    const unfollowUser = (userId) => {
      fetch("http://localhost:5000/unfollow", {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          followId: userId,
        }),
      })
        .then((res) => {
          res.json();
        })
        .then((data) => {
          console.log(data);
          setIsFollow(false);
        });
    };
  
    useEffect(() => {
      fetch(`http://localhost:5000/user/${userid}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setUser(result.user);
          setPosts(result.post);
          if (
            result.user.followers.includes(
              JSON.parse(localStorage.getItem("user"))._id
            )
          ) {
            setIsFollow(true);
          }
        });
    }, []);
    
  return (
    <div className='full_profile'>
        <Navbar />
        <div className='main_profile'>
            <div className='main_profile_header'>
                <div className='full_profile_pic_section'>
                    <div className='full_profile_pic'>
                        <img src={user.photo ? user.photo :demoimage} alt="Full_profile image" id="Full_profile_image"></img>
                    </div>
                </div>
                <div className='profile_other_info'>
                    <div className='Profile_username'>
                        {user.username}
                        <button className="followbutton" onClick={()=>
                            {
                                if(isFollow){
                                    unfollowUser(user._id)
                                }
                                else{
                                    followUser(user._id)
                                }
                            }
                            }>{isFollow ? "Unfollow":"Follow"}</button>
                    </div>
                    <div className='Profile_post_follower'>
                        <span style={{"cursor":"auto"}}>{posts.length} Posts</span>
                        <span>{user.followers ? user.followers.length:"0"} Follower</span>
                        <span>{user.following ? user.following.length:"0"} Following</span>
                    </div>
                    <div className='profile_full_name'>
                    {user.name}
                    </div>
                </div>
            </div>
            <hr style={{width:"90%"}}/>
            <div className='main_profile_gallery'>
                {posts.map((pics)=>{
                    return <div className='main_profile_post'key={pics._id}>
                    <img src={pics.photo} style={{height:"250px",width:"250px"}} alt="profile_post" 
                    // onClick={()=>toggleDetails(pics)}
                    />
                </div>
                })}
            </div>
            {/* {show && <PostDetail item={posts} toggleDetails={toggleDetails} className="Post_details_show"/>}  */}
            
          
        </div>
    </div>
  )
}
export default Userprofile;
