const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "secret123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // simple hardcoded user (for now)
  if (username !== "admin" || password !== "123456") {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { username, role: "admin" },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token
  });
});

module.exports = router;
