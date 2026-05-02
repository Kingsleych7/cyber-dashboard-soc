const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const controller = require("../controllers/scanController");

// 🔥 FIXED ROUTE
router.post("/scan", verifyToken, controller.scanTarget);

module.exports = router;
