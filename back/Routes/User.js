const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");
const requiredLogin = require("../MIddleware/requiredlogin");


router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedby: req.params.id })
                .populate("postedby", "_id")
                .then(( post,err) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.status(200).json({ user, post })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found" })
        })
})

router.put("/follow", requiredLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true
    }
    ).then((result,err)=>{
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    })
})

router.put("/unfollow", requiredLogin, (req, res) => {
    USER.findByIdAndUpdate(req.body.followId, {
        $pull: { followers: req.user._id }
    }, {
        new: true
    }
    ).then((result,err)=>{
        if (err) {
            return res.status(422).json({ error: err })
        }
        USER.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.followId }
        }, {
            new: true
        }).then(result => res.json(result))
            .catch(err => { return res.status(422).json({ error: err }) })
    })
})

// router.put("/unfollow", requiredLogin, (req, res) => {
//     USER.findByIdAndUpdate(req.body.followId, {
//         $pull: { followers: req.user._id }
//     }, {
//         new: true
//     }, (err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         }
//         USER.findByIdAndUpdate(req.user._id, {
//             $pull: { following: req.body.followId }
//         }, {
//             new: true
//         }).then(result => res.json(result))
//             .catch(err => { return res.status(422).json({ error: err }) })
//     }
//     )
// })

router.put("/uploadProfilePic", requiredLogin, (req, res) => {
    USER.findByIdAndUpdate(req.user._id, {
        $set: { photo: req.body.pic }
    }, {
        new: true
    }).then((result,err) => {
        if (err) {
            return res.status(422).json({ error: er })
        } else {
            res.json(result)
        }
    })
})

module.exports = router;