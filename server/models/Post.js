import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postSchema = new Schema({
    type: String,
    tags: [String],
    photoID: String,
    comments: [Number] // holds ids of comments
});

const Post = model('Post', postSchema);

export default Post;