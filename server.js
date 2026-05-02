require("dotenv").config();

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();   // ✅ MUST COME FIRST

app.use(cors());
app.use(express.json());
// =====================
// APP INIT (MUST FIRST)
// =====================
const app = express();

// =====================
// DB CONNECTION
// =====================
connectDB();

// =====================
// ROUTES
// =====================
app.use("/scan", require("./routes/scan"));
app.use("/dns", require("./routes/dns"));
app.use("/web", require("./routes/web"));
app.use("/auth", require("./routes/auth"));
app.use("/incidents", require("./routes/incidents"));
app.use("/analytics", require("./routes/analytics"));

// =====================
// HTTP SERVER
// =====================
const server = http.createServer(app);

// =====================
// WEBSOCKET (REAL-TIME SOC)
// =====================
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

// =====================
// BROADCAST FUNCTION
// =====================
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// =====================
// ERROR HANDLER (MUST LAST)
// =====================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal SOC server error"
  });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🛡️ SOC Server running on port ${PORT}`);
});
