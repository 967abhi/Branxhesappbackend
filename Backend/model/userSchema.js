const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  chooseyourlanguage: {
    type: String,
    enum: ["English", "Spanish", "Russian", "Arabic", "Chinese"],
  },
  email: {
    type: String,
    lowercase: true,
  },
  password: {
    type: String,
  },
  confirmpassword: {
    type: String,
  },
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
  },
  DOB: {
    // type: Date,
    type: String,
  },
  Birthhospital: {
    type: String,
  },
  Countryyouborn: {
    type: String,
  },
  Cityyouborn: {
    type: String,
  },
  educationHistory: {
    type: [
      {
        Education: {
          type: [Map],
        },
        From: {
          type: Date,
        },
        To: {
          type: Date,
        },
      },
    ],
  },
  workfromname: {
    type: String,
  },
  workfromdata: {
    type: Date,
  },
  worktodate: {
    type: Date,
  },
  workhistory: {
    type: String,
    enum: ["Adventure", "Animals", "foreign culture", "Hitching", "localfood"],
    trim: true,
  },

  Location: {
    type: [
      {
        LocationHistorycountry: {
          type: String,
        },
        LocationCity: {
          type: String,
        },
        LocationAbout: {
          type: String,
        },
      },
    ],
  },
  aboutBio: {
    type: String,
  },
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
