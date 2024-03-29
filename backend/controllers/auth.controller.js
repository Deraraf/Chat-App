import User from "../model/user.model.js"
import bcrypt from "bcryptjs"
import GenereteTokenAndCookie from "../utils/generataToken.js"
export const signup = async(req,res) =>{
 try {
    const {fullname,username,password,confirmPassword,gender} = req.body
    if(password !== confirmPassword){
      return res.status(400).json({error:"passwords don't match"})
    }
    const user = await User.findOne({username})
    if(user){
      return res.status(400).json({error:"username alrady exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

// https:avatar-placeholder.iran.liara.run
const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}` 
const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}` 

const newUser = new User({
   fullname,
   username,
   password:hashedPassword,
   gender,
 profilePic:gender === "male" ? boyProfile : girlProfile
})

if(newUser){
   //generata JWT Token
    GenereteTokenAndCookie(newUser._id,res)
   await newUser.save()

res.status(201).json({
   _id:newUser._id,
   fullname:newUser.fullname,
   username:newUser.username,
   profilePic:newUser.profilePic
})
}else
{
   return res.status(400).json({error:"Invalid user data"})
}

 } catch (error) {
    console.log("Error in signup controller",error.message)
    res.status(500).json({error:"Internal Server Error"})
 }
}
export const login = async(req,res) =>{

   try {
   const { username, password } = req.body;
   const user = await User.findOne({ username });
   if (!user) {
     return res.status(400).json({ error: "User not found" });
   }
   const isMatch = bcrypt.compare(password, user?.password || "");
   if (!isMatch) {
     return res.status(400).json({ error: "Invalid credentials" });
   }
   // Generate JWT Token
   GenereteTokenAndCookie(user._id, res);
   res.status(200).json({
     _id: user._id,
     fullname: user.fullname,
     username: user.username,
     profilePic: user.profilePic,
   });
   } catch (error) {
   console.log("Error in login controller", error.message);
   res.status(500).json({ error: "Internal Server Error" });
   }
}
export const logout = (req,res) =>{
try {
res.clearCookie("jwt");
res.status(200).json({ message: "Logged out successfully" });
} catch (error) {
console.log("Error in logout controller", error.message);
res.status(500).json({ error: "Internal Server Error" });
}

}