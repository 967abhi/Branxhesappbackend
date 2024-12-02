const mongoose = require("mongoose");
const database = mongoose.connect(
  "mongodb+srv://abhisheksinghbhtr967:ABHISHEK123@cluster0.3bu1g.mongodb.net/"
);
module.exports = database;
