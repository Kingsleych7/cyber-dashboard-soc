const express = require("express");
const router = express.Router();

const {
  getIncidents,
  closeIncident
} = require("../services/incidentManager");

router.get("/", (req, res) => {
  res.json(getIncidents());
});

router.post("/close", (req, res) => {
  closeIncident(req.body.id);
  res.json({ status: "closed" });
});

module.exports = router;
