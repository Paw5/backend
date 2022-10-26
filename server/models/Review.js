import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
    userID: Number,
    description: String,
    time: Number,
    petRating: Boolean,
    starRating: Number
});

const Review = model('Review', reviewSchema);

export default Review;