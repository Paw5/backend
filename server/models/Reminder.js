import mongoose from "mongoose";
const { Schema, model } = mongoose;

const reminderSchema = new Schema({
    type: String,
    time: Number,
    frequency: Number,
    frequencyUnit: String,
    description: String,
    title: String
});

const Reminder = model('Reminder', reminderSchema);

export default Reminder;