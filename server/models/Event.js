import mongoose from "mongoose";
const { Schema, model } = mongoose;

const eventSchema = new Schema({
    name: String,
    comments: [Number],
    tags: [String]
});

const Event = model('Event', eventSchema);

export default Event;