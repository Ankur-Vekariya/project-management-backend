let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
// Student Model
let commentSchema = require("../models/comments.model");

// CREATE Student

router.route("/create-comment").post((req, res, next) => {
  commentSchema
    .create({
      comment: req.body.comment,
      projectId: req.body.projectId,
      userId: req.body.userId,
    })
    .then((data) => {
      console.log("data", data);
      res.json(data);
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

router.route("/by-project/:projectId").get((req, res) => {
  commentSchema
    .find({ projectId: req.params.projectId })
    .then((data) => {
      console.log("project details data---", data);
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

// Update Student
router.route("/edit-project/:id").put((req, res, next) => {
  projectSchema
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((data) => {
      console.log("data---", data);
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
  // (error, data) => {
  //   if (error) {
  //     return next(error);
  //     console.log(error);
  //   } else {
  //     res.json(data);
  //     console.log("Student updated successfully !");
  //   }
  // }
});
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
