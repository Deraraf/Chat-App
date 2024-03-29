import mongoose from "mongoose";

const connectdb = async() =>{
    try {
        await mongoose.connect(process.env.MOngodb_URI)
        console.log('connected to mongodb')
    } catch (error) {
        console.log("database not connect",error)   
    }
}
export default connectdb;