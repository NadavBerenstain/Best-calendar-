const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema({
  title: String,
  date: Date,
  notes: String,
  theme: [String],
  important: Boolean,
});

const Events = mongoose.model("Events", EventsSchema);

const connection = mongoose.connect("mongodb://127.0.0.1/calendar");

module.exports = { connection, Events };
