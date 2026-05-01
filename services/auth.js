const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "analyst", password: "analyst123", role: "analyst" },
  { username: "viewer", password: "viewer123", role: "viewer" }
];

function login(username, password) {
  return users.find(
    u => u.username === username && u.password === password
  );
}

module.exports = { login };
