const express = require("express");
const router = express.Router();
const { login } = require("../services/auth");

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = login(username, password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user
  });
});

module.exports = router;
