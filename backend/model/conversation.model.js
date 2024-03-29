import mongoose, { Schema } from "mongoose"

const conversationSchema = new Schema({
participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
Message: { type: Schema.Types.ObjectId, ref: 'Message',default:[]},
createdAt: { type: Date, default: Date.now },
updatedAt: { type: Date, default: Date.now }
},{timestamps:true});

const conversation = mongoose.model("Conversation",conversationSchema)

export default conversation