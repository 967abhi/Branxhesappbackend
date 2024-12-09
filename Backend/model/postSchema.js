const express = require("express");
const mongoose = require("mongoose");
const postschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdpost: {
    type: String,
  },
});

const Post = mongoose.model("Post", postschema);
module.exports = Post;
