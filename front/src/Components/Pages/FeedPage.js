import React, { useEffect, useState } from "react";
// import Chat from "./Chat"
import "./Feedpage.css";
import "../SamplePost.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Demoimage from "../../Pictures/nature1.jpg";
const Feedpage=()=>{
    const [allpost,setallpost]=useState([]);
    const [newcomment,setnewcomment]=useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/allpost",{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
        }).then(res=>res.json())
        .then(result=>setallpost(result))
        .then(err=>console.log(err));
      }, [])
      const likePost = (id) => {
        fetch("http://localhost:5000/like", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            postId: id,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const newData = data.map((posts) => {
              if (posts._id == result._id) {
                return result;
              } else {
                return posts;
              }
            });
            setData(newData);
            console.log(result);
          });
      };
      const unlikePost = (id) => {
        fetch("http://localhost:5000/unlike", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            postId: id,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            const newData = data.map((posts) => {
              if (posts._id == result._id) {
                return result;
              } else {
                return posts;
              }
            });
            setData(newData);
            console.log(result);
          });
      };
    return(
        <div className="Main_Content">
            <div className="Post_Content">
                    {allpost.map((posts)=>{
                            return(
                                <div className='card_component'>
        <div className='card_header'>
            <div className='profile_pic'>
            <img src={Demoimage} alt='Profile_image' id="user_profile_pic" style={{"cursor":"pointer"}}/>
                <AccountCircleIcon id="demo_profile" style={{"display":"none"}}/>
            </div>
            <div className='userName_location'>
                <span style={{"cursor":"pointer"}}>{posts.postedby.username}</span>
            </div>
            <div className='card_option'>
                <MoreVertIcon style={{"cursor":"pointer"}}/>
            </div>
        </div>
        <div className='card_main'>
            <img src={posts.photo} alt="sample_image" style={{"height": "40vh"}}/>
        </div>
        <div className='card_footer'>
            <div className='card_likes_section'>
                <div className='like_share'>
                {posts.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <div style={{"cursor":"pointer"}} onClick={()=>unlikePost(posts._id)}><FavoriteIcon style={{"color":"red"}}/></div>
              ) : (
                <div style={{"cursor":"pointer"}} onClick={()=>likePost(posts._id)}><FavoriteBorderIcon /></div>
              )}
                   
                    
                    <div style={{"cursor":"pointer"}}><CommentIcon /></div>
                    <div style={{"cursor":"pointer"}}><SendIcon /></div>
                    <div style={{"margin":"0% 75%","cursor":"pointer"}}><BookmarkBorderIcon /></div>
                </div>
                <p className='total_likes'>{posts.likes.length} Likes</p> 
                <p className="post_caption">{posts.body}</p>
            </div>
            {/* <div className='card_save'>
                <BookmarkBorderIcon />
            </div> */}
            <div className='postdetils_comment'>
                <span>sample of post details and comment of a post👍👍</span>
                <div className='comment_section'>
                    <input type='text' className='add_a_comment' value={newcomment} placeholder='Add a comment' onChange={(e)=>{
                        setnewcomment(e.target.value);
                    }}/>
                    <button type='submit' className='post_comment'>Post</button>
                </div>
        </div>
        </div>
    </div>
                            )
                        })}
            </div>
    
        </div>
    )
}
export default Feedpage;