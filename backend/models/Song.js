const mongoose = require("../config/db");
const Schema = mongoose.Schema;

const SongSchema = new Schema({
  title: String,
  artist: String,
  image: String
});

module.exports = mongoose.model("Song", SongSchema);