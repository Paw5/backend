import mongoose from "mongoose";
const { Schema, model } = mongoose;

const postsManagerSchema = new Schema({
    posts: [Number] // holds ids of posts
});

const PostsManager = model('PostsManager', postsManagerSchema);

export default PostsManager;