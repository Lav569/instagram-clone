import React,{ useState,useContext} from 'react';
import './LoginPage.css';
import loginImage from "../../Pictures/loginImage.jpg";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LoginContext } from '../../Context/logincontext';
const Login=(props)=>{
    const {setuserlogin}=useContext(LoginContext);
    const navigate=useNavigate();
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const senderrormessage=(message)=>{
        toast.error(message);
    }
    const sendsuccessmessage=(message)=>{
        toast.success(message);
    }

    const senddetails=(event)=>{
        event.preventDefault();
        if(!password || !email){
            senderrormessage("Please add all the fields");
            return;
        }
        fetch("http://localhost:5000/",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>
            res.json()
        ).then(data=>{
                if(data.error){
                    senderrormessage(data.error);
                    return;
                }
                else{
                sendsuccessmessage("Signed in successfully");
                console.log(data.token);
                localStorage.setItem("jwt",data.token);
                localStorage.setItem("user",JSON.stringify(data.user));
                setuserlogin(true);
                navigate("/home");
                }
        })
    }
    return(
        <div className='container_login'>
            <div className='image_login'>
                <img src={loginImage} alt='Login_image' />
            </div>
            <div className='form_login'>
            <form className='form-container'>
                <span className="login-title"> Instagram </span>
                <input type="text" name="text" className="userName" value={email} placeholder="username or email" onChange={(e)=>{
                    setemail((e.target.value).toLowerCase())}} required/>
                <input type="password" name="password" className="userPassword" value={password} placeholder="password" onChange={(e)=>{
                    setpassword(e.target.value)}}  required/>
                <button className="loginBtn" onClick={(event)=>{senddetails(event)}}> Login </button>
            </form>
            <div className='or'>  
                <div className='linel'></div>
                <div>OR</div>
                <div className='liner'></div>    
            </div>
            <div className='sign_up'>
                <span>Don't have a account?<Link to='/signup'>sign up</Link></span>
            </div>
            </div>
        </div>
    );
}
export default Login;