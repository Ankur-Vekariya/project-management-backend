const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let commentSchema = new Schema(
  {
    comment: {
      type: String,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    projectId: { type: Schema.Types.ObjectId, ref: "Projects" },
  },
  {
    collection: "comments",
  }
);
module.exports = mongoose.model("comments", commentSchema);
