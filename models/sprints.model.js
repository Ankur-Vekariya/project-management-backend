const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let sprintSchema = new Schema(
  {
    sprintName: {
      type: String,
    },
    description: {
      type: String,
    },
    extra: {
      type: String,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    projectId: { type: Schema.Types.ObjectId, ref: "Projects" },

  },
  {
    collection: "sprints",
  }
);
module.exports = mongoose.model("sprints", sprintSchema);
