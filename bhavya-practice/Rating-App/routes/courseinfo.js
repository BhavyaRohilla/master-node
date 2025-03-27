const courseRoutes = require("express").Router();
const courseData = require("../Data/courses.json");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

courseRoutes.use(bodyParser.json());
courseRoutes.use(bodyParser.urlencoded({ extended: true }));

courseRoutes.get("/", (req, res) => {
  res.status(200).send(courseData);
});

courseRoutes.post("/", (req, res) => {
  const courseDetails = req.body;
  let writePath = path.join(__dirname, "..", "Data", "courses.json");
  let courseDataModified = courseData;
  courseDataModified.airtribe.push(courseDetails);
  fs.writeFileSync(writePath, JSON.stringify(courseDataModified));
  res.status(200).send("Corse has been added successfully");
});

courseRoutes.get("/:courseId", (req, res) => {
  let airtribeCourse = courseData.airtribe;
  let courseId = req.params.courseId;
  let course = airtribeCourse.filter((course) => course.courseId == courseId);

  res.status(200).send(course);
});

module.exports = courseRoutes;
