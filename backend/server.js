const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


require("dotenv").config();
const  app = express();
const port = process.env.PORT||3000;

app.use(cors());
app.use(express.json());

const uri =process.env.MONGO_LINK;      //uri of our database (mongodb)

mongoose.connect(uri,{useNewUrlParser:true,
                      useCreateIndex:true})         //connecting to database


const connectionStatus=mongoose.connection; //logging connection status
connectionStatus.once("open",()=>{
    console.log("Connected to MongoDB Atlas");
})

//adding routes
const exerciseRouter = require("./routes/exercise")
const userRouter = require("./routes/user")

//middleware to add routes to exercise and user
app.use("/exercise",exerciseRouter) 
app.use("/user",userRouter)

app.listen(port,()=>{
    console.log("Now listening on port: "+port);
})