// backend/server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");

// Свързване с MongoDB чрез db.js
const mongoose = require("./config/db");

const Song = require("./models/Song");
const Round = require("./models/Round");
const Vote = require("./models/Vote");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Настройка за качване на изображения (за поздрави)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// Create song
app.post("/songs", async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
});

// Create round
app.post("/rounds", async (req, res) => {
  const round = new Round({ playlist: req.body.playlist });
  await round.save();
  res.json(round);
});

// Get current round
app.get("/rounds/current", async (req, res) => {
  const round = await Round.findOne({ status: "open" }).populate("playlist");
  res.json(round);
});

// Vote (free или paid)
app.post("/vote", upload.single("image"), async (req, res) => {
  const { roundId, songId, type, message } = req.body;
  const isPaid = type === "paid";
  const vote = new Vote({
    round: roundId,
    song: songId,
    type,
    score: isPaid ? 3 : 1,
    message: isPaid ? message : null,
    image: isPaid && req.file ? `/uploads/${req.file.filename}` : null
  });
  await vote.save();
  res.json(vote);
});

// Get votes per round
app.get("/votes/:roundId", async (req, res) => {
  const votes = await Vote.find({ round: req.params.roundId });
  res.json(votes);
});

// Стартиране на backend
app.listen(3000, () => console.log("Backend running on http://localhost:3000"));