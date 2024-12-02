const express = require("express");
const { simpledata } = require("../controllers/userController");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const userRouter = express();
// userRouter.get("/", simpledata);
// userRoute.post("/choose-language", chooselanguage);
userRouter.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const salt = 10;
    const hashedpassword = await bcrypt.hash(password, salt);

    const data = new User({ name, username, email, password: hashedpassword });
    const savedData = await data.save();
    res.status(200).json({ message: "Data saved successfully", savedData });
  } catch (error) {
    console.error("Error Found:", error); // Log the complete error object
    res.status(400).json({
      message: "Error Found",
      error: error.message || "Unknown error occurred", // Send the error message
    });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).json({ message: "Password not match" });
    }
    res.status(200).json({
      message: "Login Successfully",
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(400).send({ message: "error found", err });
  }
});
module.exports = userRouter;
