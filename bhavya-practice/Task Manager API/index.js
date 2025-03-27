const express = require("express");
const tasksRoutes = require("./routes/taskRoutes");
const app = express();
app.use(express.json());

app.use("/", tasksRoutes);

app.listen(3000, (err) => {
  console.log("Server started on port 3000");
});
