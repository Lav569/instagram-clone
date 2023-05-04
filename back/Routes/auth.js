const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const USER=mongoose.model("USER");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const {jwt_secret}=require("../keys.js");
const requiredlogin = require("../MIddleware/requiredlogin.js");
router.get('/',(req,res
    )=>{
    res.send("hello");
});

router.post("/signup",(req,res)=>{
    const {username,name,email,password}=req.body;
    if(!username || !name|| !email|| !password){
        res.status(422).json({error:"Please add all the fields"});
    }
    USER.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            res.status(422).json({error:"This Email is already used, please change"});
            return;
        }
    });
    USER.findOne({username:username}).then((saveduser)=>{
        if(saveduser){
            return res.status(422).json({error:"This username is already taken, please chnage this"});
        }
        else{
            bcrypt.hash(password,12).then((hashedpassword)=>{
                const user= new USER({
                    username,
                    name,
                    email,
                    password:hashedpassword
                })
                user.save()
                .then(user=>{
                    res.json({message:"saved successfully"})
                }).catch(err=>console.log(err))
            })            
        }
    })
})
router.post("/",(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(422).json({error:"Please add all the fields"});
    }
    USER.findOne({$or:[{email:email},{username:email}]}).then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error:"This user doesn't exists"});
        }
        bcrypt.compare(password,savedUser.password).then((validate)=>{
            if(!validate){
                return res.status(422).json({error:"Password doesn't match with username"});
            }
            else{
                //  res.status(200).json({Mesage:"Login Successfully"});
                 const token= jwt.sign({_id:savedUser.id},jwt_secret);
                 const {_id,name,email,username}=savedUser;
                 res.status(200).json({message:"Login Successfully",token,user:{_id,name,email,username}});
                //  console.log({message:"Login Successfully",token,user:{_id,name,email,username}});
                //  console.log(token);
                 return
            }
        }).catch(error=>console.log(error));
        console.log(savedUser);
    })
})

module.exports= router;