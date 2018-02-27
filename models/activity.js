var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
  title: String,
  image: String
});

module.exports = mongoose.model("Activity",activitySchema);
