import express from 'express';
const app = express();
import mongoose from "mongoose";
//require("dotenv").config();
import dotenv from "dotenv";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

const port = 3001;
const uri = process.env.MONGODB_CONNECTION_STRING;

mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDb Connected"));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(port, () => {console.log("Listening on port 3001")});