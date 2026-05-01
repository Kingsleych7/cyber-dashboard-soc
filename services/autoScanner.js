const { runScan } = require("./nmapService");
const { logScan } = require("../utils/logger");
const targets = require("../config/targets");
const { sendAlert } = require("../utils/alertBroadcaster");
const { broadcast } = require("../server");
const { analyzeThreat } = require("../utils/aiAnalyst");
const { analyzeRisk } = require("../utils/alertEngine");
const {
  createIncident
} = require("./incidentManager");
async function startAutoScan() {

  for (const target of targets) {

    const result = await runScan(target);

    const analysis = analyzeRisk(result);
  const incident = createIncident(event);

broadcast({
  ...event,
  incident
});
    const ai = analyzeThreat({
  target,
  result
});

const event = {
  type: "SECURITY_SCAN",
  target,
  result,
  analysis,
  ai,   // 🧠 NEW AI LAYER
  time: new Date()
};
    logScan(event);

// 🚨 ALERT CONDITION (SOC CORE RULE)
if (analysis.level === "HIGH") {
  sendAlert({
    target,
    severity: "HIGH",
    message: "Critical vulnerability detected",
    alerts: analysis.alerts,
    time: new Date()
  });
}

    // 🚨 SEND LIVE SOC EVENT
    broadcast(event);
  }
}

setInterval(startAutoScan, 60000);

module.exports = startAutoScan;
