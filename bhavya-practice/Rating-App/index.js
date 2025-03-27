const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = require("express").Router();
const courseInfo = require("./routes/courseinfo");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

// Mount routes on the app
app.use("/", routes);

routes.use("/courses", courseInfo);

app.listen(3000, (err) => {
  if (!err) {
    console.log("Server started on port 3000");
  } else {
    console.log(err);
  }
});
