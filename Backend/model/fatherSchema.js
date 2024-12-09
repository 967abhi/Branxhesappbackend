const express = require("express");
const mongoose = require("mongoose");
const fatherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  selectRole: {
    type: String,
  },
  Name: {
    type: String,
  },
  userName: {
    type: String,
  },
  emailaddress: {
    type: String,
  },
  phonenumber: {
    type: Number,
  },
});
const father = mongoose.model("father", fatherSchema);
module.exports = father;
