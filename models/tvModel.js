const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TvSchema = new Schema({
  title: { type: String, required: true },
  id: { type: String, required: true },
  firstAirDate: { type: String, required: true },
  lastAirDate: { type: String, required: true },
  nextAirDate: { type: String },
  noEpisodes: { type: Number, required: true },
  noSeasons: { type: Number, required: true },
  trackedBy: { type: Schema.Types.ObjectId, ref: "Users" },
});

module.exports = mongoose.model("TvShows", TvSchema);
