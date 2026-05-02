const axios = require("axios");

const BASE_URL = "https://cyber-command-center.onrender.com";
// or http://localhost:3000 if local

async function runScan(target) {
  try {
    const res = await axios.post(`${BASE_URL}/scan`, {
      target: "127.0.0.1"
    });

    console.log("\n🧪 SCAN RESULT");
    console.log("Target:", res.data.target);
    console.log("Risk:", res.data.analysis.risk);
    console.log("Score:", res.data.analysis.score);
    console.log("-----------------------------------");
  } catch (err) {
    console.log("❌ Scan failed:", err.response?.data || err.message);
  }
}

async function getAnalytics() {
  try {
    const res = await axios.get(`${BASE_URL}/analytics`);
    console.log("\n📊 ANALYTICS");
    console.log(res.data);
    console.log("-----------------------------------");
  } catch (err) {
    console.log("❌ Analytics failed:", err.message);
  }
}

async function getIncidents() {
  try {
    const res = await axios.get(`${BASE_URL}/incidents`);
    console.log("\n🚨 INCIDENTS");
    console.log(res.data);
    console.log("-----------------------------------");
  } catch (err) {
    console.log("❌ Incidents failed:", err.message);
  }
}

// 🧠 SOC SIMULATION RUNNER
async function runSOC() {
  console.log("🛡️ STARTING SOC TEST SIMULATION...\n");

  await runScan("127.0.0.1");
  await runScan("192.168.1.1");
  await runScan("8.8.8.8");

  await getAnalytics();
  await getIncidents();

  console.log("\n✅ SOC TEST COMPLETE");
}

runSOC();
