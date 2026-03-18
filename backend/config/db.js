// backend/config/db.js
const mongoose = require("mongoose");

// Локален MongoDB URI
const MONGO_URI = "mongodb://127.0.0.1:27017/clubvote";

// Свързване с MongoDB (без useNewUrlParser и useUnifiedTopology)
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

module.exports = mongoose;