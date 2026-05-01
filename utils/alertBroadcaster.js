
let clients = [];

function registerClient(ws) {
  clients.push(ws);
}

function removeClient(ws) {
  clients = clients.filter(c => c !== ws);
}

function sendAlert(alert) {
  clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({
        type: "ALERT",
        ...alert
      }));
    }
  });
}

module.exports = {
  registerClient,
  removeClient,
  sendAlert
};
