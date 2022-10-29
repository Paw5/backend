import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    phoneNumber: Number,
    socialHandles: [String],
    bio: String,
    groups: [String],
    pet: [Number], // holds ids of pets
    settings: [String],
    friends: [Number], // holds ids of friends user accounts
    followers: Number,
    following: [Number], // holds ids of users
    blockList: [Number], // holds ids of users
    reminders: [Number] // holds ids of reminders
})

const User = model('User', userSchema);

export default User;