require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Internal SOC server error"
  });
});

// 🔗 connect database
connectDB();

// routes
app.use("/scan", require("./routes/scan"));
app.use("/dns", require("./routes/dns"));
app.use("/web", require("./routes/web"));
app.use("/auth", require("./routes/auth"));
app.use("/incidents", require("./routes/incidents"));
app.use("/analytics", require("./routes/analytics"));

// ✅ CREATE HTTP SERVER
const server = http.createServer(app);

// ✅ CREATE WEBSOCKET SERVER (THIS WAS MISSING)
const wss = new WebSocket.Server({ server });

// store clients
let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

// broadcast function
function broadcast(data) {
  clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data));
    }
  });
}

// export broadcast (important)
module.exports.broadcast = broadcast;

// start server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🛡️ SOC Server running on port ${PORT}`);
});

