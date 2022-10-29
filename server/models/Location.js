import mongoose from "mongoose";
const { Schema, model } = mongoose;

const locationSchema = new Schema({
    name: String,
    url: String,
    petRatings: [Number],
    starRating: Number,
    locationType: String,
    reviews: [Number] // holds Ids of reviews
});

const Location = model('Location', locationSchema);

export default Location;