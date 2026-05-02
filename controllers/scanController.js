const { runScan } = require("../services/nmapService");
const { scorePorts } = require("../utils/scoring");

exports.scanTarget = async (req, res) => {
  try {
    // ✅ user comes from auth middleware (NOT body)
    const user = req.user;

    if (!user || user.role === "viewer") {
      return res.status(403).json({
        error: "Access denied: insufficient permissions"
      });
    }

    const target = req.body.target;

    if (!target) {
      return res.status(400).json({
        error: "Target is required"
      });
    }

    // 1. RUN SCAN
    const result = await runScan(target);

    // 2. ANALYZE
    const analysis = scorePorts(result);

    // 3. RETURN SOC RESPONSE
    return res.json({
      target,
      result,
      analysis: {
        score: analysis.score,
        risk: analysis.risk
      }
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
};
