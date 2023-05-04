// import React from "react";
// import { toast } from 'react-toastify';
// import { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import "./Newpost.css";
// import Navbar from "../Navbar/Navbar";
// const Newpost =()=>{
//   const [imageFiles, setImageFiles] = useState([]);
//   const [images, setImages] = useState([]);
//   const [videoFiles, setvideoFiles] = useState([]);
//   const [videos, setvideos] = useState([]);
//   const [caption,setcaption]=useState("");
//   const [imageurl,setimageurl]=useState("");
//   const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;
//   const videoTyperegex= /video\/(mp4|mkv|avi)/gm;
//   const senderrormessage=(message)=>{
//     toast.error(message);
// }
// const loadfile = (e) => {
//   var output = document.getElementById("output");
//   output.src = URL.createObjectURL(e.target.files[0]);
//   output.onload = function () {
//     URL.revokeObjectURL(output.src); // free memory
//   };
// };
// const changeHandler = (e) => {
//   const { files } = e.target;
//   const validImageFiles = [];
//   const validvideofiles=[];
//   for (let i = 0; i < files.length; i++) {
//     const file = files[i];
//     if (file.type.match(imageTypeRegex)) {
//       validImageFiles.push(file);
//     }
//     // else if(file.type.match(videoTyperegex)){
//     //   validvideofiles.push(file);
//     // }
//     else{
//     senderrormessage(` file is not image , please change the file`);
//     return;
//     }
// }
//   if (validImageFiles.length) {
//     setImageFiles(validImageFiles);
//     loadfile(e);
//   }
//   // if (validvideofiles.length){
//   //   setvideoFiles(validvideofiles);
//   // }
// };
// // useEffect(() => {
// //   const images = [], fileReaders = [];
// //   const videos = [], fileReaderss = [];
// //   let isCancel = false;
// //   let iscancel=false;
// //   if (imageFiles.length) {
// //     imageFiles.forEach((file) => {
// //       const fileReader = new FileReader();
// //       fileReaders.push(fileReader);
// //       fileReader.onload = (e) => {
// //         const { result } = e.target;
// //         if (result) {
// //           images.push(result)
// //         }
// //         if (images.length === imageFiles.length && !isCancel) {
// //           setImages(images);
// //         }
// //       } 
// //       fileReader.readAsDataURL(file);
// //     })
// //   };
// //   if(videoFiles.length){
// //     videoFiles.forEach((file)=>{
// //       const fileReader = new FileReader();
// //       fileReaderss.push(fileReader);
// //       fileReader.onload=(e)=>{
// //         const {result}=e.target;
// //         if(result){
// //           videos.push(result)
// //         }
// //         if(videos.length === videoFiles.length && !iscancel){
// //           setvideos(videos);
// //         }
// //       }
// //       fileReader.readAsDataURL(file);
// //     })
// //   }
// //   return () => {
// //     isCancel = true;
// //     iscancel=true;
// //     fileReaders.forEach(fileReader => {
// //       if (fileReader.readyState === 1) {
// //         fileReader.abort()
// //       }
// //     });
// //      fileReaderss.forEach(fileReader => {
// //       if (fileReader.readyState === 1) {
// //         fileReader.abort()
// //       }
// //     })
// //   }
// // }, [imageFiles,videoFiles]);

// useEffect(()=>{
//   if (imageurl){
//     fetch("http://localhost:5000/newpost",{
//       method:"post",
//       headers:{
//         "Content-Type":"application/json",
//         "Authorization":"Bearer "+localStorage.getItem("jwt")
//       },
//       body:JSON.stringify({
//         caption,
//         pic:imageurl
//       })
//     }).then(res=>res.json()).then(data=>console.log(data)).catch(err=>console.log(err));
//   }
// }, [imageurl,caption])
//   const postnewpostdetails=()=>{
//     const data= new FormData();
//     data.append("file",images);
//     // data.append("file",videos);
//     data.append("upload_preset","instagram");
//     data.append("cloud_name","lavcloud");
//     fetch("https://api.cloudinary.com/v1_1/lavcloud/image/upload",{
//       method:"post",
//       body:data
//     }).then(res=>res.json()).then(data=>setimageurl(data.url)).catch(err=>console.log(err))

//   }
//   return (
//     <div className="crate_new_post">
//       <Navbar />
//       <div className="new_post_full_info">
//         <div className="modal">
//                 <div className="new_post_header_section">
//                     <div className="new_post_header"> Create New Post </div>
//                     {/* <button className="close_crete_model" onClick={close} style={{float:"right"}}>&times;</button> */}
//                     <button className="new_post_save" onClick={()=>{
//                       postnewpostdetails();
//                     }}>Post</button>
//                 </div>
//                 <hr style={{width:"90%",height:"2px"}}/>
//                 <div className="new_post_content">
//                 <img
//           id="output"
//           src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png" style={{height:"250px",width:"250px",margin:"2px"}}
//          alt="sample_post_image"/>
//                 <input
//             type="file"
//             id="file"
//             onChange={(event)=>{
//             changeHandler(event);
//           }}
//             accept="image/*"
//           />
//            {/* {
//         images.length > 0?
//           <div >
//             {
//               images.map((image, idx) => {
//                 return  <img src={image} alt="" style={{height:"250px",width:"250px",margin:"2px"}} key={idx}/>
//               })
//             }
//           </div> : null
//       }
//       {
//         videos.length > 0?
//           <div >
//             {
//               videos.map((video, idx) => {
//                 return  <video width="320" height="240" controls>
//                             <source src={video} type="video/mp4" />
//                             Your browser does not support the video tag.
//                         </video>
//             })
//       }
//           </div> : null
//       } */}
//                 </div>
//                 <hr style={{width:"90%",height:"2px"}}/>
//                 <div className="new_post_footer">
//                     <textarea type="text" placeholder="Write caption of your post" style={{border:"none",outline:"none"}} value={caption} onChange={(e)=>{
//                       setcaption(e.target.value)}}/>
//                 </div>
//               </div>
//       </div>
//     </div>
//   );
// };

// export default Newpost;
