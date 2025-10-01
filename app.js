import express from "express";
import mongoose from "mongoose";
import users from "./routes/users.js";
import auth from "./routes/auth.js";
const app = express();

app.use(express.json());
app.use("/users", users);
app.use("/auth", auth);

const PORT = 4000;
const DB_PATH = "mongodb+srv://root:root@cluster0.iyenqnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Mongo connection error:", err);
  });