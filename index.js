let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
// Express Route
const userRoute = require("./routes/user.routes.js");
const projectRoute = require("./routes/project.routes.js");
const sprintRoute = require("./routes/sprints.routes.js");


// const studentRoute = require("./routes/student.route.js");
// const productRoute = require("./routes/product.route.js");
// const floorRoute = require("./routes/floor.route.js");
// const roomRoute = require("./routes/room.route.js");
// const categoryRoute = require("./routes/category.route.js");

// Connecting mongoDB Database
mongoose
  .connect("mongodb://127.0.0.1:27017/projectmanagementsystem")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
// app.use("/students", studentRoute);
app.use("/users", userRoute);
app.use("/projects", projectRoute);
app.use("/sprints", sprintRoute);


// app.use("/floor", floorRoute);
// app.use("/room", roomRoute);
// app.use("/category", categoryRoute);

// PORT
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// 404 Error
// app.use((req, res, next) => {
//   next(createError(404));
// });
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
