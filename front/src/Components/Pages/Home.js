import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useNavigate,Link } from "react-router-dom";
import "./Home.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import demoimage from "../../Pictures/nature1.jpg";
import CancelIcon from "@mui/icons-material/Cancel";
import { toast } from "react-toastify";
const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [allpost, setallpost] = useState([]);
  const [newcomment, setnewcomment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);
  const senderrormessage = (msg) => toast.error(msg);
  const sendsuccessmessage = (msg) => toast.success(msg);
  useEffect(() => {
    if (!token) {
      navigate("../");
    }
    fetch("http://localhost:5000/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => setallpost(result))
      .catch((err) => console.log(err));
  }, []);
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
        const newData = allpost.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setallpost(newData);
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
        const newData = allpost.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setallpost(newData);
        console.log(result);
      });
  };
  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };
  const makeComment = (text, id) => {
    console.log(newcomment);
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = allpost.map((posts) => {
          if (posts._id == result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setallpost(newData);
        setnewcomment("");
        sendsuccessmessage("Comment posted");
        console.log(result);
      });
  };
  return (
    <div className="Home">
      <Navbar />
      <div className="Main_Content">
        <div className="Post_Content">
          {allpost.map((posts) => {
            return (
              <div className="card_component">
                <div className="card_header">
                  <div className="profile_pic">
                    <img
                      src={posts.postedby.photo ? posts.postedby.photo :demoimage}
                      alt="Profile_image"
                      id="user_profile_pic"
                      style={{ cursor: "pointer" }}
                    />
                    <AccountCircleIcon
                      id="demo_profile"
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="userName_location">
                    <Link to={`/profile/${posts.postedby._id}`}>
                    <span style={{ cursor: "pointer",textDecoration:"none" }}>
                      {posts.postedby.username}
                    </span>
                    </Link>
                    
                  </div>
                  <div className="card_option">
                    <MoreVertIcon style={{ cursor: "pointer" }} />
                  </div>
                </div>
                <div className="card_main">
                  <img
                    src={posts.photo}
                    alt="sample_image"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>
                <div className="card_footer">
                  <div className="card_likes_section">
                    <div className="like_share">
                      {posts.likes.includes(
                        JSON.parse(localStorage.getItem("user"))._id
                      ) ? (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => unlikePost(posts._id)}
                        >
                          <FavoriteIcon style={{ color: "red" }} />
                        </div>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => likePost(posts._id)}
                        >
                          <FavoriteBorderIcon />
                        </div>
                      )}
                      {/* <div style={{ cursor: "pointer" }}>
                        <CommentIcon />
                      </div> */}
        
                    </div>
                    <p className="total_likes">{posts.likes.length} Likes</p>
                    <p className="post_caption">{posts.body}</p>
                    <p
                      style={{ fontWeight: "bold", cursor: "pointer" }}
                      onClick={() => {
                        toggleComment(posts);
                      }}
                    >
                      View all comments
                    </p>
                  </div>
                  <div className="postdetils_comment">
                    <div className="comment_section">
                      <input
                        type="text"
                        className="add_a_comment"
                        value={newcomment}
                        placeholder="Add a comment"
                        onChange={(e) => {
                          setnewcomment(e.target.value);
                        }}
                      />
                      <button
                        type="submit"
                        className="post_comment"
                        onClick={() => makeComment(newcomment, posts._id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
      {show && (
        <div className="showComment">
        <div className="container">
          <div className="postPic">
            <img src={item.photo} alt="" />
          </div>
          <div className="details">
            <div
              className="card-header"
              style={{ borderBottom: "1px solid #00000029" }}
            >
              <div className="card-pic">
                {/* <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt=""
                /> */}
              </div>
              <h5>{item.postedby.username}</h5>
            </div>

            <div
              className="comment-section"
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

            <div className="card-content">
              <p>{item.likes.length} Likes</p>
              <p>{item.body}</p>
            </div>

            <div className="add-comment">
              <input
                type="text"
                placeholder="Add a comment"
                value={newcomment}
                onChange={(e) => {
                  setnewcomment(e.target.value);
                }}
              />
              <button
                className="comment"
                onClick={() => {
                  makeComment(newcomment, item._id);
                  toggleComment();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
        <div
          className="close-comment"
          onClick={() => {
            toggleComment();
          }}
        >
            <CancelIcon />
          
        </div>
      </div>
      )}
      

    </div>
  );
};
export default Home;
