import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = "super_secret_key"; 
const JWT_EXPIRES_IN = "1h";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // 1. Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 3. Create new admin
    const admin = new Admin({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await admin.save();

    // 4. Create JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
      admin: { id: admin._id, email: admin.email, firstname, lastname },
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      admin: { id: admin._id, email: admin.email, firstname: admin.firstname, lastname: admin.lastname },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
