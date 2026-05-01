const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");

router.get("/", async (req, res) => {
  const incidents = await Incident.find();

  // ------------------------
  // 📊 1. RISK DISTRIBUTION
  // ------------------------
  const riskStats = { HIGH: 0, MEDIUM: 0, LOW: 0 };

  // ------------------------
  // 🎯 2. TARGET TRACKING
  // ------------------------
  const targets = {};

  // ------------------------
  // 🕒 3. TIME SERIES
  // ------------------------
  const timeline = {};

  incidents.forEach(i => {
    // risk
    if (riskStats[i.risk] !== undefined) {
      riskStats[i.risk]++;
    }

    // targets
    targets[i.target] = (targets[i.target] || 0) + 1;

    // timeline (by date)
    const date = new Date(i.time).toISOString().split("T")[0];
    timeline[date] = (timeline[date] || 0) + 1;
  });

  // ------------------------
  // 📈 4. FORMAT TOP TARGETS
  // ------------------------
  const topTargets = Object.entries(targets)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // ------------------------
  // 📊 FORMAT TIMELINE
  // ------------------------
  const timelineData = Object.entries(timeline)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({
    riskStats,
    topTargets,
    timelineData,
    totalIncidents: incidents.length
  });
});

module.exports = router;
