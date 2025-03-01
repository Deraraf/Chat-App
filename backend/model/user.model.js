import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname:{type:String,requred:true},
    username:{type:String, required:true,unique:true},
    password:{type:String,requied:true,minlength:6},
    gender:{type:String,required:true,enum:["male","female"]},
    profilePic:{type:String,default:""}
},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User