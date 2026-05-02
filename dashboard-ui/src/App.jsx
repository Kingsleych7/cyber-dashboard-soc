import { useEffect, useState } from "react";

export default function App() {
  const [events, setEvents] = useState([]);
 const [incidents, setIncidents] = useState([]);
const [analytics, setAnalytics] = useState(null);
const [alerts, setAlerts] = useState([]);  
const [user, setUser] = useState(null);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const login = async () => {
const [analytics, setAnalytics] = useState(null);
  const res = await fetch("http://127.0.0.1:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.user) {
    setUser(data.user);
  } else {
    alert("Login failed");
  }
};
 
useEffect(() => {
  const ws = new WebSocket("ws://localhost:3000");

  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    setEvents(prev => [data, ...prev]);
  };
const fetchAnalytics = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/analytics`)
  const data = await res.json();
  setAnalytics(data);
};

fetchAnalytics();
const interval = setInterval(fetchAnalytics, 5000);

return () => clearInterval(interval);
const fetchAnalytics = async () => {
  const res = await fetch("http://localhost:3000/analytics");
  const data = await res.json();
  setAnalytics(data);
};

setInterval(fetchAnalytics, 5000);

if (data.type === "ALERT") {
  setAlerts(prev => [data, ...prev]);
Notification.requestPermission();

  // 🔊 SOUND ALERT
  const audio = new Audio("https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg");
  audio.play();

  // 📢 BROWSER NOTIFICATION
  if (Notification.permission === "granted") {
    new Notification("🚨 SOC ALERT", {
      body: data.message
    });
  }
}
  // 🧠 INCIDENT FETCH LOOP (ADD HERE)
  const fetchIncidents = async () => {
    try {
      const res = await fetch("http://localhost:3000/incidents");
      const data = await res.json();
      setIncidents(data);
    } catch (err) {
      console.log("Incident fetch error:", err.message);
    }
  };

  // run immediately once
  fetchIncidents();

  // then repeat every 5 seconds (SOC polling)
  const interval = setInterval(fetchIncidents, 5000);

  return () => {
    ws.close();
    clearInterval(interval);
  };
}, []);

<div style={{ marginTop: 30 }}>
  <h2>🚨 LIVE ALERTS</h2>

  {alerts.map((a, i) => (
    <div
      key={i}
      style={{
        background: "#2a0000",
        padding: 12,
        margin: "10px 0",
        borderLeft: "5px solid red",
        borderRadius: "6px"
      }}
    >
      <h3>🚨 ALERT</h3>
      <p><b>Target:</b> {a.target}</p>
      <p><b>Message:</b> {a.message}</p>
      <p><b>Severity:</b> {a.severity}</p>
    </div>
  ))}
</div>
if (!user) {
  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 SOC LOGIN</h2>

      <h3>Logged in as: {user.username} ({user.role})</h3>

      <input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
  return (
    <div style={{ background: "#0d1117", color: "#fff", minHeight: "100vh", padding: 20 }}>
      <h1>🛡️ LIVE SOC DASHBOARD</h1>

      <div>
        {events.map((e, i) => (
  <div
    key={i}
    style={{
      margin: "10px 0",
      padding: "12px",
      background: "#161b22",
      borderRadius: "8px",
      borderLeft:
        e.analysis?.level === "HIGH"
          ? "5px solid red"
          : e.analysis?.level === "MEDIUM"
          ? "5px solid orange"
          : "5px solid #00ff99"
    }}
  >
    <h3>🎯 Target: {e.target}</h3>

    <p>
      🛡️ Risk Level:{" "}
      <b style={{ color:
        e.analysis?.level === "HIGH"
          ? "red"
          : e.analysis?.level === "MEDIUM"
          ? "orange"
          : "#00ff99"
      }}>
        {e.analysis?.level}
      </b>
    </p>

    <p>📊 Score: {e.analysis?.score}</p>
 
 {e.ai && (
  <div style={{ marginTop: 10 }}>
    <h4>🧠 AI Analysis</h4>

    <p><b>Severity:</b> {e.ai.severity}</p>
    <p>{e.ai.summary}</p>

    {e.ai.findings.map((f, i) => (
      <p key={i}>🔍 {f}</p>
    ))}

    {e.ai.explanation.map((ex, i) => (
      <p key={i}>🧠 {ex}</p>
    ))}
  </div>
)}

    {e.analysis?.alerts?.length > 0 && (
      <div>
        <h4>🚨 Alerts:</h4>
        {e.analysis.alerts.map((a, idx) => (
          <p key={idx}>⚠️ {a}</p>
        ))}
      </div>
    )}
 
    <pre style={{
      background: "#000",
      padding: "8px",
      marginTop: "10px",
      overflowX: "auto"
    }}>
      {typeof e.result === "string"
        ? e.result.slice(0, 300)
        : JSON.stringify(e.result, null, 2)}
    </pre>
  </div>
))}

      {analytics && (
  <div style={{ marginTop: 40 }}>
    <h2>📊 SOC ANALYTICS</h2>

    <p>Total Incidents: {analytics.total}</p>

    <BarChart width={300} height={200}
      data={[
        { name: "HIGH", value: analytics.riskStats.HIGH },
        { name: "MEDIUM", value: analytics.riskStats.MEDIUM },
        { name: "LOW", value: analytics.riskStats.LOW }
      ]}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  </div>
)}
       
       {analytics && (
  <div style={{ marginTop: 40 }}>
    <h2>📊 SOC INTELLIGENCE DASHBOARD</h2>

    <p>Total Incidents: {analytics.totalIncidents}</p>

    <h3>🟥 Risk Distribution</h3>
    <p>HIGH: {analytics.riskStats.HIGH}</p>
    <p>MEDIUM: {analytics.riskStats.MEDIUM}</p>
    <p>LOW: {analytics.riskStats.LOW}</p>

    <h3>🎯 Top Targets</h3>
    {analytics.topTargets.map((t, i) => (
      <p key={i}>{t.name} → {t.count}</p>
    ))}

    <h3>🕒 Timeline</h3>
    {analytics.timelineData.map((t, i) => (
      <p key={i}>{t.date} → {t.count}</p>
    ))}
  </div>
)}
            <b>{e.type}</b> — {e.target}
            <pre>{e.result?.slice?.(0, 200)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
