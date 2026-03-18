const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const RoundSchema = new Schema({
  playlist: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  status: { type: String, default: "open" },
  startTime: { type: Date, default: Date.now },
  endTime: Date
});

module.exports = mongoose.model("Round", RoundSchema);