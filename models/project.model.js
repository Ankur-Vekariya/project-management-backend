const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let projectSchema = new Schema(
  {
    projectName: {
      type: String,
    },
    description: {
      type: String,
    },
    technology: {
      type: String,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    collection: "project",
  }
);
module.exports = mongoose.model("project", projectSchema);
