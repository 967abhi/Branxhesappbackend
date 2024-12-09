// const { decode } = require("jsonwebtoken");

const jwt = require("jsonwebtoken");
const authmiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  //   console.log("token", token);
  if (!token) {
    return res.status(401).json({ message: "Access denied:No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "abhishek");
    // console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (Err) {
    console.log("error found", Err);
    res.status(403).json({ message: "Invalid Token" });
  }
};
module.exports = authmiddleware;
