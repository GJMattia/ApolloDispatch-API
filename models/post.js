const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const post = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    content: {
      type: String,
    },
    likes: {
      value: { type: Number, default: 0 },
      users: { type: [String], default: [] },
    },
    dislikes: {
      value: { type: Number, default: 0 },
      users: { type: [String], default: [] },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", post);
