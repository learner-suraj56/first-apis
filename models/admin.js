import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, // hashed password
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
