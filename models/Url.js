const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: [true, "longUrl required"],
    unique: true,
  },
  shortId: {
    type: String,
    required: [true, "shortId required"],
    unique: true,
  },
  date:{
    type: Date,
    default: Date.now,
  }
});

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
