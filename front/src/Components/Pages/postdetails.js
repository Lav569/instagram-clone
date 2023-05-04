import React from "react";
import "./postdetails.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from '@mui/icons-material/Delete';
export default function PostDetail({ item,toggleDetails }) {
  const navigate = useNavigate();
  const senderrormessage = (msg) => toast.error(msg);
  const sendsuccessmessage = (msg) => toast.success(msg);

  const removePost = (postId) => {
    if (window.confirm("Do you really want to delete this post ?")) {
      fetch(`http://localhost:5000/deletepost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toggleDetails();
          navigate("/");
          sendsuccessmessage(result.message);
        });
    }
  };

  return (
    <div className="showpost">
      <div className="full_post_show">
        <div className="postpic">
          <img src={item.photo} alt="" />
        </div>
        <div className="full_post_details">
          <div
            className="card_header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <span style={{fontWeight:"bolder"}}>{item.postedby.username}</span>
            <DeleteIcon className="deletepost" onClick={() => {
                removePost(item._id);
              }}/>
          </div>
          <div
            className="comment_section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment)=>{
                return (
                  <p className="comm">
                <span
                  className="commenter"
                  style={{ fontWeight: "bolder" }}
                >
                  {comment.postedby.username}{" "}
                </span>
                <span className="commentText">{comment.comment}</span>
              </p>
                )
              })}
            
          </div>
          <div className="card_content">
          <p>{item.likes.length} Likes</p>
              <p>{item.body}</p>
          </div>
          <div className="add_comment">
            <input
              type="text"
              placeholder="Add a comment"
            />
            <button
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close_comment"  onClick={() => {
            toggleDetails();
          }}
      >
        <CancelIcon />
      </div>
    </div>
    // <div className="showComment">
    //     <div className="container">
    //       <div className="postPic">
    //         <img src={item.photo} alt="" />
    //       </div>
    //       <div className="details">
    //         <div
    //           className="card-header"
    //           style={{ borderBottom: "1px solid #00000029" }}
    //         >
    //           <div className="card-pic">
    //             {/* <img
    //               src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
    //               alt=""
    //             /> */}
    //           </div>
    //           <h5>{item.postedby.username}</h5>
    //         </div>

    //         <div
    //           className="comment-section"
    //           style={{ borderBottom: "1px solid #00000029" }}
    //         >
    //           {item.comments.map((comment)=>{
    //             return (
    //               <p className="comm">
    //             <span
    //               className="commenter"
    //               style={{ fontWeight: "bolder" }}
    //             >
    //               {comment.postedby.username}{" "}
    //             </span>
    //             <span className="commentText">{comment.comment}</span>
    //           </p>
    //             )
    //           })}
              
    //         </div>

    //         <div className="card-content">
    //           <p>{item.likes.length} Likes</p>
    //           <p>{item.body}</p>
    //         </div>

    //         <div className="add-comment">
    //           <input
    //             type="text"
    //             placeholder="Add a comment"
    //           />
    //           <button
    //             className="comment"
    //           >
    //             Post
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       className="close-comment"
    //     >
    //       <span className="material-symbols-outlined material-symbols-outlined-comment">
    //         <CancelIcon />
    //       </span>
    //     </div>
    //   </div>
  );
}