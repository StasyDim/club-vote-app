const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  round: { type: Schema.Types.ObjectId, ref: "Round" },
  song: { type: Schema.Types.ObjectId, ref: "Song" },
  type: { type: String, enum: ["free", "paid"] },
  score: Number,
  message: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vote", VoteSchema);