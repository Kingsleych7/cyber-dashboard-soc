const axios = require("axios");

async function checkHeaders(url) {
  const response = await axios.get(url);

  return response.headers;
}

module.exports = { checkHeaders };
