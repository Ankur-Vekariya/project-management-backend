let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
// Student Model
let sprintSchema = require("../models/sprints.model");
let projectSchema = require("../models/project.model");

// CREATE Student

router.route("/create-sprint").post((req, res, next) => {
  sprintSchema
    .create({
      sprintName: req.body.sprintName,
      description: req.body.description,
      extra: req.body.extra,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo,
      projectId: req.body.projectId,
    })
    .then((data) => {
      console.log("data", data);
      projectSchema
        .findByIdAndUpdate(
          { _id: req.body.projectId },
          {
            $addToSet: {
              sprints: data._id,
            },
          }
        )
        .then((data) => {
          console.log("data---", data);
          res.json(data);
        })
        .catch((error) => {
          res.send(error);
        });
      // res.json(data);
    })
    .catch((error) => {
      console.log("error", error);

      res.json(error);
    });
});
// READ Students
router.route("/").get((req, res) => {
  projectSchema
    .find()
    .then((data) => {
      console.log("data---", data);
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
});
// get category by id
router.route("/get-category").get((req, res) => {
  console.log(req.body.categories);
  let response = [];
  let obj2 = req.body.categories.map((item) => {
    console.log("item", item);
    return userSchema.findById(item, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log("data", data);
        return data;
        // let response = [];
        // response.push(data);
        // res.json(response);
      }
    });
  });
  console.log(obj2);

  res.json(response);
});
// Get Single Student
// router.route("/edit-floor/:id").get((req, res) => {
//   floorSchema.findById(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.json(data);
//     }
//   });
// });

// // Update Student
// router.route("/update-floor/:id").put((req, res, next) => {
//   floorSchema.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (error, data) => {
//       if (error) {
//         return next(error);
//         console.log(error);
//       } else {
//         res.json(data);
//         console.log("Student updated successfully !");
//       }
//     }
//   );
// });
// // Delete Student
// router.route("/delete-floor/:id").delete((req, res, next) => {
//   floorSchema.findByIdAndRemove(req.params.id, (error, data) => {
//     if (error) {
//       return next(error);
//     } else {
//       res.status(200).json({
//         msg: data,
//       });
//     }
//   });
// });
module.exports = router;
