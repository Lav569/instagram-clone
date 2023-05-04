import React,{ useState} from 'react';
import './SignUp.css';
import loginImage from "../../Pictures/loginImage.jpg";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const SignUp=()=>{
    const  navigate=useNavigate();
    const basicemailexp=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let basicpasswordexp = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    const [name,setname]=useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [email, setemail] = useState("");
    
    const senderrormessage=(message)=>{
        toast.error(message);
    }
    const sendsuccessmessage=(message)=>{
        toast.success(message);
    }
    const senddetails=(event)=>{
        event.preventDefault();
        if(!name || !username ||!password || !email){
            senderrormessage("Please add all the fields");
            return;
        }
        else if(!basicemailexp.test(email)){
            senderrormessage("Invalid Email");
            return;
        }
        else if(!basicpasswordexp.test(password)){
            senderrormessage("Password must contains atleast one lowercase, one uppercase, one number, one special chraacter and length between 6-16");
            return;
        }
        fetch("http://localhost:5000/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                name:name,
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
                sendsuccessmessage(data.message);
                navigate("/");
        })
    }
    return(
        <div className='container_login'>
            <div className='image_login'>
                <img src={loginImage} alt='Login_image' />
            </div>
            <div className='form_signup'>
            <form className='form-container' >
                <span className="login-title"> Instagram </span>
                <input type="text" name="username" className="userName" placeholder="Username" value={username} onChange={(e)=>{
                    setusername((e.target.value).toLowerCase())}}  required/>
                <input type="text" name="name" className="userfullName" placeholder="Full Name" value={name} onChange={(e)=>{
                    setname(e.target.value)}}  required/>
                <input type="email" name="email" className="userEmail" placeholder="Email" value={email} onChange={(e)=>{
                    setemail((e.target.value).toLowerCase())}}  required/>
                <input type="password" name="password" className="userPassword" placeholder="password" value={password} onChange={(e)=>{
                    setpassword(e.target.value)}}  required/>
                <span>By signing up, you are agreeing our terms and policy</span>
                <button className="loginBtn" onClick={(event)=>{senddetails(event)}}>SignUp</button>
            </form>
            <div className='or'>  
                <div className='linel'></div>
                <div>OR</div>
                <div className='liner'></div>    
            </div>
            <div className='sign_up'>
                <span>Already have a account?<Link to="/">Login</Link></span>
            </div>
            </div>
        </div>
    );
}
export default SignUp;