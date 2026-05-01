let incidents = [];

function createIncident(event) {
  const incident = {
    id: Date.now(),
    target: event.target,
    risk: event.analysis.level,
    score: event.analysis.score,
    alerts: event.analysis.alerts,
    status: "OPEN",
    time: new Date()
  };

  incidents.push(incident);

  return incident;
}

function getIncidents() {
  return incidents;
}

function closeIncident(id) {
  incidents = incidents.map(i =>
    i.id === id ? { ...i, status: "CLOSED" } : i
  );
}

module.exports = {
  createIncident,
  getIncidents,
  closeIncident
};
