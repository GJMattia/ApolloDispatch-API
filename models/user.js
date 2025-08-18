const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    pic: {
      type: Number,
      default: 0,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 3,
      required: true,
    },
    verified: {
      type: Boolean,
      trim: true,
      required: true,
      default: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
      default: function () {
        return Math.floor(1000 + Math.random() * 9000);
      },
    },
    vehicles: [
      {
        type: Schema.Types.ObjectId,
        ref: "vehicle",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  return next();
});

module.exports = mongoose.model("User", userSchema);
