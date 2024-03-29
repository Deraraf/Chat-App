import jwt from "jsonwebtoken"

const GenereteTokenAndCookie = (userId,res) =>{
    const Token = jwt.sign({userId},process.env.JWT_SECRET, {
        expiresIn:"15d"
    }) 
    res.cookie("jwt",Token,{
      maxAge: 15 * 24 * 60 *60 *1000,//ms formate
      httpOnly:true ,// prevent XSS atacts cross-site scripting attacts
      sameSite:"strict"
    })
}
export default GenereteTokenAndCookie;