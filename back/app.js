const express= require('express');
const app=express();
const portnumber=5000;
const {mongourl}= require("./keys.js")

const mongoose=require('mongoose');
const cors=require("cors");
app.use(cors());
require("./Models/models.js");
require("./Models/post.js");
app.use(express.json());
app.use(require('./Routes/auth'));
app.use(require('./Routes/createpost'));
app.use(require('./Routes/User'));
mongoose.connect(mongourl);
mongoose.connection.on("connected",()=>{
    console.log("connected to mongo");
});
mongoose.connection.on("error",()=>{
    console.log(" not connected to mongo");
});
app.listen(portnumber,()=>{
    console.log("server is running on port : "+portnumber)
});