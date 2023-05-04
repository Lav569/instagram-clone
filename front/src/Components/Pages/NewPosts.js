import React, { useState, useEffect } from "react";
import "./Newpost.css";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
export default function Newposts() {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  const navigate = useNavigate()

  // Toast functions
  const senderrormessage = (msg) => toast.error(msg);
  const sendsuccessmessage = (msg) => toast.success(msg);


  useEffect(() => {

    // saving post to mongodb
    if (url) {

      fetch("http://localhost:5000/newpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            senderrormessage(data.error)
          } else {
            sendsuccessmessage("Successfully Posted")
            navigate("/home");
          }
        })
        .catch(err => console.log(err))
    }

  }, [url])
  // posting image to cloudinary
  const postDetails = () => {

    console.log(body, image)
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "instagram")
    data.append("cloud_name", "lavcloud")
    fetch("https://api.cloudinary.com/v1_1/lavcloud/image/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err));
    console.log(url);

  }
  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  return (
    <div className="crate_new_post">
      <Navbar />
      <div className="new_post_full_info">
        <div className="modal">
                <div className="new_post_header_section">
                    <div className="new_post_header"> Create New Post </div>
                    {/* <button className="close_crete_model" onClick={close} style={{float:"right"}}>&times;</button> */}
                    <button className="new_post_save" onClick={()=>{
                      postDetails()
                    }}>Post</button>
                </div>
                <hr style={{width:"90%",height:"2px"}}/>
                <div className="new_post_content">
                <img
          id="output"
          src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" style={{height:"250px",width:"250px",margin:"2px"}}
         alt="sample_post_image"/>
                <input
            type="file"
            id="file"
            onChange={(event)=>{
            loadfile(event);
            setImage(event.target.files[0]);
          }}
            accept="image/*"
          />
                </div>
                <hr style={{width:"90%",height:"2px"}}/>
                <div className="new_post_footer">
                    <textarea type="text" placeholder="Write caption of your post" style={{border:"none",outline:"none"}} value={body} onChange={(e)=>{
                      setBody(e.target.value)}}/>
                </div>
              </div>
      </div>
    </div>
  );
}