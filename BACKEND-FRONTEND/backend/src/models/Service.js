const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const ServiceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  prize: {
      type: String,
      required: true
  },
  city: {
    type: String,
    required: true
  },
  Category: {
    type: Schema.Types.ObjectId,
    ref: "categories"
  },
  User: {
    type: Schema.Types.ObjectId,
    ref:"users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Service = mongoose.model("services", ServiceSchema);