const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  target: String,
  risk: String,
  score: Number,
  alerts: [String],
  time: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Incident", IncidentSchema);
