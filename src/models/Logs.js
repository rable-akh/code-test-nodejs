"use strict";
const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  link: {
    type: String,
  },
  action: {
    type: String,
  },
  change: {
    type: String,
  },
  created_by: {
    type: "objectId",
    ref: "admin"
  },
},
{ timestramp: true}
);

const logDoc = mongoose.model("log", logSchema);

module.exports = logDoc;