const { runScan } = require("../services/nmapService");
const { scorePorts } = require("../utils/scoring");

exports.scanTarget = async (req, res) => {
  try {
    const target = req.body.target;

    const result = await runScan(target);

    const analysis = scorePorts(result);

    res.json({
      target,
      result,
      analysis
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
