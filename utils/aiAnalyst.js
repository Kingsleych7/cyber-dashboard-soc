function analyzeThreat(event) {
  const text = (event.result || "").toString();

  let findings = [];
  let explanation = [];
  let severity = "LOW";

  // SSH
  if (text.includes("22/tcp")) {
    findings.push("SSH exposed");
    explanation.push(
      "SSH (port 22) is open. If password auth is enabled, it may be vulnerable to brute-force attacks."
    );
    severity = "MEDIUM";
  }

  // FTP
  if (text.includes("21/tcp")) {
    findings.push("FTP service detected");
    explanation.push(
      "FTP is unencrypted. Attackers can intercept credentials and data in transit."
    );
    severity = "MEDIUM";
  }

  // HTTP
  if (text.includes("80/tcp")) {
    findings.push("HTTP service running");
    explanation.push(
      "Unencrypted web traffic detected. Sensitive data may be exposed if HTTPS is not enforced."
    );
  }

  // Dev server
  if (text.includes("3000")) {
    findings.push("Development server exposed");
    explanation.push(
      "A Node.js development server is publicly reachable. This may expose debug endpoints."
    );
    severity = "HIGH";
  }

  // FINAL SOC SUMMARY
  let summary = "System appears stable with no major exposure.";

  if (severity === "MEDIUM") {
    summary = "Some services exposed. Recommend restricting access and hardening services.";
  }

  if (severity === "HIGH") {
    summary = "Critical exposure detected. Immediate mitigation recommended.";
  }

  return {
    findings,
    explanation,
    severity,
    summary
  };
}

module.exports = { analyzeThreat };
