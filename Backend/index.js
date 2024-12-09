const express = require("express");
const database = require("./config/db");
const userRouter = require("./routes/userRoutes");
const app = express();
const port = 3000;

app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(400).send({ message: "Hello Bhai Sahab" });
});
database
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`The app is listen ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error found", err);
  });
