import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import users from "./routes/users.js";
const app = express();


app.use(bodyParser.json());
app.use("/users", users);

const PORT = 3000;
const DB_PATH = "mongodb+srv://root:root@cluster0.iyenqnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});

    