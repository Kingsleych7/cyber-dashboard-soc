function analyzeRisk(result) {
  let score = 0;
  let alerts = [];

  // Convert result to string safely
  const text = result.toString();

  // 🚨 SSH exposed
  if (text.includes("22/tcp")) {
    score += 40;
    alerts.push("SSH port exposed (22)");
  }

  // 🚨 FTP exposed
  if (text.includes("21/tcp")) {
    score += 30;
    alerts.push("FTP service detected (21)");
  }

  // 🚨 HTTP exposed
  if (text.includes("80/tcp")) {
    score += 10;
    alerts.push("HTTP service running (80)");
  }

  // 🚨 Node.js exposed
  if (text.includes("3000")) {
    score += 20;
    alerts.push("Dev server exposed (3000)");
  }

  let level = "LOW";
  if (score >= 60) level = "HIGH";
  else if (score >= 30) level = "MEDIUM";

  return {
    score,
    level,
    alerts
  };
}

module.exports = { analyzeRisk };
