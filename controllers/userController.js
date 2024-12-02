const User = require("../model/userSchema");

const simpledata = (req, res) => {
  try {
    res.status(200).send({ message: "Hello from the user route" });
  } catch (err) {
    res.send("error found", err);
  }
};
// const chooselanguage = async (req, res) => {
//   try {
//     const { language } = req.params;

//     // Simply send back the language
//     const data = await User({
//       chooseyourlanguage: language,
//     });

//     res.status(200).json({
//       message: "Language choice received",
//       data,
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Error occurred", error: err.message });
//   }
// };

module.exports = { simpledata };
