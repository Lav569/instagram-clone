const express=require("express");
const router=express.Router();
const mongoose=require("mongoose");
const requiredlogin = require("../MIddleware/requiredlogin");
const POST= mongoose.model("POST");


router.get("/allpost",requiredlogin,(req,res) =>{
    POST.find()
    .populate("postedby","_id username photo")
    .populate("comments.postedby","_id username name")
    .sort("-createdAt").then(posts=>res.json(posts)).catch(err=>console.log(err));
})
router.get("/myposts",requiredlogin,(req,res) =>{
    POST.find({ postedby: req.user._id })
    .populate("postedby","_id username photo")
    .populate("comments.postedby","_id username").sort("-createdAt")
    .then(posts=>res.json(posts)).catch(err=>console.log(err));
})

router.put("/like",requiredlogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).populate("postedby","_id username photo").then((result,err)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})

router.put("/unlike",requiredlogin,(req,res)=>{
    POST.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).populate("postedby","_id username photo").then((result,err)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})

router.post("/newpost",requiredlogin,(req,res)=>{
    const {body,pic}=req.body;
    if(!body || !pic){
        return res.status(422).json({error:"please all the parts of post"});
    }
    req.user;
    const post= new POST({
        body,
        photo:pic,
        postedby:req.user
    });
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch(err=>console.log(err));
})

router.put("/comment",requiredlogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedby:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{
            comments:comment
        }
    },{
        new:true
    }).populate("comments.postedby","_id username")
    .populate("postedby","_id username")
    .then((result,err)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result);
        }
    })
})

router.delete("/deletepost/:postId", requiredlogin, (req, res) => {
    POST.findByIdAndRemove({ _id: req.params.postId },{
    })
        .populate("postedby", "_id username")
        .then((post,err) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            // if (post.postedby._id.toString() == req.user._id.toString()) {
            //     post.deleteItem()
            //         .then(result => {
            //             return res.json({ message: "Successfully deleted" })
            //         }).catch((err) => {
            //             console.log(err)
            //         })
            // }
            else{
                res.json({ message: "Successfully deleted" });
            }
        })
})

router.get("/myfollwingpost", requiredlogin, (req, res) => {
    POST.find({ postedby: { $in: req.user.following } })
        .populate("postedby", "_id username")
        .populate("comments.postedby", "_id username")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})
module.exports = router;