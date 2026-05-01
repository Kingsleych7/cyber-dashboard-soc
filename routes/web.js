const express = require("express");
const router = express.Router();
const { checkHeaders } = require("../services/webService");

router.post("/", async (req, res) => {
  const url = req.body.url;

  try {
    const headers = await checkHeaders(url);

    res.json({
      url,
      headers
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
