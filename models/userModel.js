const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  passWord: { type: String, required: true },
  email: { type: String, required: true },
  expoPushToken: { type: String },
  tracking: { type: Schema.Types.ObjectId, ref: "TvShows" },
});

module.exports = mongoose.model("Users", UserSchema);
