const express = require("express");
const router = express.Router();

const { scanTarget } = require("../controllers/scanController");

const { verifyToken } = require("../services/authSecurity");

router.post("/scan", verifyToken, controller.scanTarget);

module.exports = router;
