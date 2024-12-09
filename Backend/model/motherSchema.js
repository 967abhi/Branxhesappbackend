const express = require("express");
const mongoose = require("mongoose");
const motherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  motherselectRole: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motheruserName: {
    type: String,
  },
  motheremailaddress: {
    type: String,
  },
  motherphonenumber: {
    type: Number,
  },
});
const mother = mongoose.model("mother", motherSchema);
module.exports = mother;
