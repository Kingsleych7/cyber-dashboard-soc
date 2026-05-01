const fs = require("fs");

function logScan(data) {
  fs.appendFileSync(
    "./logs/report.json",
    JSON.stringify({
      time: new Date(),
      data
    }) + "\n"
  );
}

module.exports = { logScan };
