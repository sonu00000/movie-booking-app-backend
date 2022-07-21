const mongoose = require("mongoose");
const {
  userTypes: { admin, customer, theatreOwner },
} = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: customer,
      enum: {
        values: [admin, customer, theatreOwner],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
