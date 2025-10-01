import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
}, { versionKey: false });

const User = mongoose.model("User", userSchema);
export default User;
