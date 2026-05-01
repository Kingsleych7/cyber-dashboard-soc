const express = require("express");
const router = express.Router();
const { lookup } = require("../services/dnsService");

router.post("/", async (req, res) => {
  const domain = req.body.domain;

  try {
    const result = await lookup(domain);

    res.json({
      domain,
      result
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
