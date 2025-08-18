const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicle = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    vin: {
      type: Number,
      required: true,
    },
    inspection: {
      type: Date,
      default: null,
    },
    fluid: {
      type: Boolean,
      default: true,
    },
    tire: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    notes: {
      type: [
        {
          text: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicle", vehicle);
