const router = require("express").Router();
let User = require("../models/user.model");

//route/user get all users
router.route("/").get((req,res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.status("404").json("Error: "+ err))
})


//add a user /route/add
router.route("/add").post((req,res)=>{
    const username=req.body.username;

    const newuser = new User({username:username});

    newuser.save()
    .then(()=>res.json("New User Created!"))
    .catch(err=>res.status("404").json("Error: "+err));
})

module.exports=router;