const { runScan } = require("../services/nmapService");
const { scorePorts } = require("../utils/scoring");

exports.scanTarget = async (req, res) => {
  try {
    const user = req.body.user;

    if (!user || user.role === "viewer") {
      return res.status(403).json({
        error: "Access denied: insufficient permissions"
      });
    }

    const target = req.body.target;

    // ⚡ SIMULATED INSTANT SOC SCAN RESULT
    const fakePorts = [
      { port: 22, status: "closed" },
      { port: 80, status: "open" },
      { port: 443, status: "open" },
      { port: 3306, status: "filtered" }
    ];

    const score = Math.floor(Math.random() * 100);

    const risk =
      score > 70 ? "high" :
      score > 40 ? "medium" :
      "low";

    return res.json({
      target,
      timestamp: new Date().toISOString(),

      result: {
        ports: fakePorts,
        scanType: "SIMULATED_MVP_SCAN"
      },

      analysis: {
        score,
        risk,
        summary: "Instant SOC MVP scan completed (simulated engine)"
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
