import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    userID: Number,
    description: String,
    time: Number,
    likes: [Number] // user IDs
});

const Comment = model('Comment', commentSchema);

export default Comment;