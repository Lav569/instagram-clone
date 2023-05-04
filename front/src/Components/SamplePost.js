import React, { useState } from 'react';
import "./SamplePost.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Demoimage from "../Pictures/nature1.jpg";
const SamplePost = () => {
    const [newcomment,setnewcomment]=useState("")
  return (
    <div className='card_component'>
        <div className='card_header'>
            <div className='profile_pic'>
            <img src={Demoimage} alt='Profile_image' id="user_profile_pic" style={{"cursor":"pointer"}}/>
                <AccountCircleIcon id="demo_profile" style={{"display":"none"}}/>
            </div>
            <div className='userName_location'>
                <span style={{"cursor":"pointer"}}>UserName</span>
                <span style={{"cursor":"pointer"}}>Location</span>
            </div>
            <div className='card_option'>
                <MoreVertIcon style={{"cursor":"pointer"}}/>
            </div>
        </div>
        <div className='card_main'>
            <img src={Demoimage} alt="sample_image" style={{"height": "40vh"}}/>
        </div>
        <div className='card_footer'>
            <div className='card_likes_section'>
                <div className='like_share'>
                    <div style={{"cursor":"pointer"}}><FavoriteBorderIcon /></div>
                    <div style={{"cursor":"pointer"}}><CommentIcon /></div>
                    <div style={{"cursor":"pointer"}}><SendIcon /></div>
                    <div style={{"margin":"0% 75%","cursor":"pointer"}}><BookmarkBorderIcon /></div>
                </div>
                <p className='total_likes'>0 Likes</p> 
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
}
export default SamplePost