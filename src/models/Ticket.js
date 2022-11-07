"use strict";
const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema({
  name: {
    type: String,
  },
  code: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: String,
  },
  status: {
    type: String, // Pending // Review // aproved // passed
  },
  status_logs: {
    type: Array
  },
  created_by: {
    type: "objectId",
    ref: "admin"
  },
},
{ timestramp: true}
);

const ticketDoc = mongoose.model("ticket", ticketSchema);

module.exports = ticketDoc;