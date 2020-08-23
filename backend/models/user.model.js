const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,  //removes white spaces
        maxLength:50
    }
},{
    timestamps:true //when user was created
});

const User = mongoose.model("User",userSchema);

module.exports=User;