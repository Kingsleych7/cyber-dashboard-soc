function scorePorts(scanOutput) {
  let score = 0;

  if (scanOutput.includes("22/tcp")) score += 30;
  if (scanOutput.includes("21/tcp")) score += 40;
  if (scanOutput.includes("80/tcp")) score += 10;
  if (scanOutput.includes("3000")) score += 20;

  return {
    score,
    risk:
      score > 60 ? "HIGH" :
      score > 30 ? "MEDIUM" : "LOW"
  };
}

module.exports = { scorePorts };
