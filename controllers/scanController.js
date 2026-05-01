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

    // 1. RUN SCAN FIRST
    const result = await runScan(target);

    // 2. THEN ANALYZE RESULT
    const analysis = scorePorts(result);

    // 3. RETURN RESPONSE
        res.json({
  target,
  result,
  analysis: {
    score: analysis.score,
    risk: analysis.risk
  }
});

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
