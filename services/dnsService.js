const { exec } = require("child_process");

function lookup(domain) {
  return new Promise((resolve, reject) => {
    exec(`nslookup ${domain}`, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

module.exports = { lookup };
