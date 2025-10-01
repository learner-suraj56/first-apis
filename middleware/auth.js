import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken(token);
    req.user = payload; // attach {id, email} to req
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
