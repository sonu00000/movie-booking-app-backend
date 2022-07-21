const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { secret } = require("../configs/auth.config");
const {
  userTypes: { admin, customer, theatreOwner },
} = require("../utils/constants");
const { updateUser } = require("../controllers/user.controller");

const verifyToken = async (req, res, next) => {
  //read the token from user req headers
  const token = req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided" });
  }

  /** Verify the token */
  try {
    //get the payload
    const decoded = jwt.verify(token, secret);

    //set the req object with userId property for next middleware in line
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    /** fetch the user from db with the help of userId from req object */
    const user = await User.findOne({ _id: req.userId });

    if (user.type === admin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Requires ADMIN role",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const isAdminOrSelf = async (req, res, next) => {
  try {
    /** fetch the user from db with the help of userId from req object */
    const user = await User.findOne({ _id: req.userId });
    /** fetch the user from req params */
    const loggedInUser = await User.findOne({ _id: req.params.userId });

    console.log(user._id);
    console.log(loggedInUser._id);

    if (user._id === loggedInUser._id || loggedInUser.type === admin) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Only the user himself can update his own account or an ADMIN",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const isAdminOrTheatreOwner = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (user.type == admin || user.type == theatreOwner) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Requires ADMIN or Theatre Owner role",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { verifyToken, isAdmin, isAdminOrSelf, isAdminOrTheatreOwner };
