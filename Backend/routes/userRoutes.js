const express = require("express");
const {
  simpledata,
  register,
  login,
  logout,
  profile,
  basicdetails,
  workfromdata,
  workhistory,
  locationhistory,
  insertBio,
  fatherdata,
  motherdata,
  createdpost,
} = require("../controllers/userController");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authmiddleware = require("../middleware/auth");
const userRouter = express();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/profile", authmiddleware, profile);
userRouter.post("/basicdetails/:id", authmiddleware, basicdetails);
userRouter.post("/workfromdata/:id", authmiddleware, workfromdata);
userRouter.post("/workhistory/:id", authmiddleware, workhistory);
userRouter.post("/locationhistory/:id", authmiddleware, locationhistory);
userRouter.post("/insertbio/:id", authmiddleware, insertBio);
userRouter.post("/fatherdata/:id", authmiddleware, fatherdata);
userRouter.post("/motherdata/:id", authmiddleware, motherdata);
userRouter.post("/createpost/:id", authmiddleware, createdpost);

module.exports = userRouter;
