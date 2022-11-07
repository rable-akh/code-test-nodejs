"use strict";
const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  updated_at: {
    type: Date,
  },
});

const AdminDoc = mongoose.model("admin", adminSchema);

module.exports = AdminDoc;
