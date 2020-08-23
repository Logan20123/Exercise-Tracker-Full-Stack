const router = require("express").Router();
let Exercise =require("../models/exercise.model");

//routes/exercise gets all exercises
router.route("/").get((req,res)=>{
    Exercise.find()
        .then(exercises=>res.json(exercises))
        .catch((err)=>res.status("404").json("Error: "+err))
})

//add a new exercise from the body of frontend form (route is /route/exercise/add)
router.route("/add").post((req,res)=>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username:username,
        description:description,
        duration:duration,
        date:date
    });
    newExercise.save()      //saving  in mongodb with mongoose
    .then(()=>res.json("Exercises created!"))
    .catch((err)=>res.status("404").json("Error: "+err))
})

//if a prarm is given after /route/exercise/:id then get that exercise by id
router.route("/:id").get((req,res)=>{
    let newId = req.params.id;
    Exercise.findById(newId)
        .then(exercise=>res.json(exercise))
        .catch((err)=>res.status("404").json("Error: "+err))
})

//if delete button is clicked in the frontend
router.route("/:id").delete((req,res)=>{
    let newId=req.params.id;
    Exercise.findByIdAndDelete(newId)
    .then(exercise=>res.json(exercise+" deleted"))
    .catch((err)=>res.status("404").json("Error: "+err))
})

//if edit button is clicked (/route/exercise/update/:id)
router.route("/update/:id").post((req,res)=>{
    let newId=req.params.id;
    Exercise.findById(newId)
    .then(exercise=>{
        exercise.username=req.body.username;
        exercise.description=req.body.description;
        exercise.duration=Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
        exercise.save()
        .then(()=>res.json("Exercise updated"))
        .catch((err)=>res.status("404").json("Error: "+err))
    })
    .catch((err)=>res.status("404").json("Error: "+err))
});

module.exports=router;