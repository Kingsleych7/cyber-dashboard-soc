const { runScan } = require("./nmapService");
const { logScan } = require("../utils/logger");
const targets = require("../config/targets");
const { broadcast } = require("../server");
const { analyzeRisk } = require("../utils/alertEngine");

async function startAutoScan() {
  for (const target of targets) {

    const result = await runScan(target);

    const analysis = analyzeRisk(result);

    const event = {
      type: "SECURITY_SCAN",
      target,
      result,
      analysis,
      time: new Date()
    };

    logScan(event);

    // 🚨 SEND LIVE SOC EVENT
    broadcast(event);
  }
}

setInterval(startAutoScan, 60000);

module.exports = startAutoScan;
