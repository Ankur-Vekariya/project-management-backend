let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
// Student Model
let userSchema = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

router.route("/create-user").post((req, res, next) => {
  const { userName, email, password, role } = req.body;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    time: Date(),
    email: email,
  };

  const token = jwt.sign(data, jwtSecretKey);
  userSchema
    .create({
      userName: userName,
      email: email,
      password: password,
      role: role,
      token: token,
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
// READ all Students
router.route("/login").post((req, res) => {
  const { email, password, role } = req.body;
  userSchema
    .find({ email: email, password: password, role: role })
    .then((data) => {
      console.log("data---", data);
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.route("/").get((req, res) => {
  userSchema
    .find()
    .then((data) => {
      console.log("data---", data);
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
});
// READ all Students
router.route("/all/manager").get((req, res) => {
  userSchema
    .find({ role: "manager" })
    .then((data) => {
      console.log("data---", data);
      res.json(data);
    })
    .catch((error) => {
      res.send(error);
    });
});
router.route("/all/developer").get((req, res) => {
  userSchema
    .find({ role: "developer" })
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
  let response = [];
  let obj2 = req.body.categories.map((item) => {
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
