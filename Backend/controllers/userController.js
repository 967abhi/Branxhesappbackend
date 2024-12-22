const User = require("../model/userSchema");
// const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const father = require("../model/fatherSchema");
const mother = require("../model/motherSchema");
const Post = require("../model/postSchema");

const simpledata = (req, res) => {
  try {
    res.status(200).send({ message: "Hello from the user route" });
  } catch (err) {
    res.send("error found", err);
  }
};
const chooselanguage = async (req, res) => {
  try {
    const { language } = req.params;

    // Simply send back the language
    const data = await User({
      chooseyourlanguage: language,
    });

    res.status(200).json({
      message: "Language choice received",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Error occurred", error: err.message });
  }
};
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const salt = 10;
    const hashedpassword = await bcrypt.hash(password, salt);

    const data = new User({
      name,
      username,
      email,
      password: hashedpassword,
    });
    const savedData = await data.save();
    res.status(200).json({ message: "Data saved successfully", savedData });
  } catch (error) {
    console.error("Error Found:", error); // Log the complete error object
    res.status(400).json({
      message: "Error Found",
      error: error.message || "Unknown error occurred", // Send the error message
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Login Attempt:", { email, password }); // Log request data

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    // console.log("User Found:", user); // Log user data

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    // console.log("Password Match:", ismatch); // Log password match status

    if (!ismatch) {
      return res.status(400).json({ message: "Password not match" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "abhishek", {
      expiresIn: "1h",
    });
    // console.log("Generated Token:", token); // Log generated token

    res.status(200).json({
      message: "Login Successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    // console.error("Error During Login:", err); // Log error details
    res.status(400).send({ message: "error found", err });
  }
};
const logout = (req, res) => {
  try {
    // Clear the token from cookies
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // Ensure it matches the secure flag used during login
      sameSite: "strict", // Ensure it matches the sameSite policy used during login
    });

    // Respond with success
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err.message);
    return res.status(500).json({ message: "An error occurred during logout" });
  }
};
const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found successfully", user });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};

const basicdetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      DOB,
      Birthhospital,
      Countryyouborn,
      Cityyouborn,
      Education,
      From,
      To,
    } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).send({ message: "User not found" });
    }
    user.DOB = DOB || user.DOB;
    user.Birthhospital = Birthhospital || user.Birthhospital;
    user.Countryyouborn = Countryyouborn || user.Countryyouborn;
    user.Cityyouborn = Cityyouborn || user.Cityyouborn;
    user.Education = Education || user.Education;
    user.From = From || user.From;
    user.To = To || user.To;

    const updateuser = await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      user: updateuser,
    });
  } catch (err) {
    console.log("error found", err);
    res.status(400).send({ message: "Error found", err });
  }
};
const workfromdata = async (req, res) => {
  try {
    const { id } = req.params;
    const { workfromname, workfromdata, worktodate } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).send({ message: "user not found" });
    }
    user.workfromname = workfromname || user.workfromname;
    user.workfromdata = workfromdata || user.workfromdata;
    user.worktodate = worktodate || user.worktodate;

    const updatedata = await user.save();
    res
      .status(200)
      .send({ message: "update data submitted successfully", updatedata });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};
const workhistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { workhistory } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const data = await User.updateOne({ _id: id }, { $set: { workhistory } });
    res.status(200).send({ message: "User data saved successfully", data });
  } catch (Err) {
    console.log("error found", Err);
    res.status(400).send({ message: "Error found", Err });
  }
};
const locationhistory = async (req, res) => {
  try {
    const { id } = req.params;
    const { LocationHistorycountry, LocationCity, LocationAbout } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    const result = User.updateMany(
      {
        _id: id,
      },
      { $set: { LocationHistorycountry, LocationCity, LocationAbout } }
    );
    res.status(200).send({ message: "saved data successfully", result });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};
const insertBio = async (req, res) => {
  try {
    const { id } = req.params;
    const { aboutBio } = req.body;
    const user = await User.findById(id);
    if (!user) {
      res.status(401).send({ message: "User not found" });
    }
    const data = User.updateOne({ _id: id }, { $set: { aboutBio } });
    res.status(200).send({ message: "Data saved successfully", data });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};
const fatherdata = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, selectRole, Name, userName, emailaddress, phonenumber } =
      req.body;
    const data = new father({
      user: user._id,
      selectRole,
      Name,
      userName,
      emailaddress,
      phonenumber,
    });
    const result = await data.save();
    res.status(200).send({ message: "Result data saved successfully", result });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};
const motherdata = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user,
      motherselectRole,
      motherName,
      motheruserName,
      motheremailaddress,
      motherphonenumber,
    } = req.body;
    const userin = await User.findById(id);
    if (!userin) {
      res.status(401).send({ message: "User not found" });
    }
    const result = new mother({
      user: user._id,
      motherselectRole,
      motherName,
      motheruserName,
      motheremailaddress,
      motherphonenumber,
    });
    const resultdata = await result.save();
    res.status(200).send({ message: "Data saved successfully" });
  } catch (err) {
    res.status(400).send({ message: "Error Found ", err });
  }
};
const createdpost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user, createdpost } = req.body;
    const userfind = await User.findById(id);
    if (!userfind) {
      res.status(401).send({ message: "User not found" });
    }

    const data = new Post({
      user: user._id,
      createdpost,
    });
    const resultdata = await data.save();
    res.status(200).send({ message: "comment data saved", resultdata });
  } catch (err) {
    res.status(400).send({ message: "Error found", err });
  }
};

module.exports = {
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
};
