const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    number: "number",
    ptTitle: "string",
    enTitle: "string",
  },
  { versionKey: false }
);

 const movies = mongoose.model("Movies", schema);

 module.exports = movies
