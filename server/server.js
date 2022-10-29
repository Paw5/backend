import express from 'express'; // library for creating server
const app = express();
import mongoose from "mongoose"; // library for connecting to MongoDB
import dotenv from "dotenv"; // library for processing .env files

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

const port = 3001; // port to listen on
const uri = process.env.MONGODB_CONNECTION_STRING; // connection string used to connect to Atlas

// establishes connection to database
mongoose
    .connect(uri, { useNewUrlParser: true })
    .then(() => console.log("MongoDb Connected"));

const db = mongoose.connection; // holds the connection to database

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(port, () => {console.log("Listening on port 3001")}); // has server listen for requests