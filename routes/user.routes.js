const express = require("express");
const router = express.Router();
const {
  updatePassword,
  updateUser,
} = require("../controllers/user.controller");
const { verifyToken, isAdminOrSelf } = require("../middlewares/authjwt");

router.route("/").put([verifyToken], updatePassword);
router.route("/:userId").put([verifyToken, isAdminOrSelf], updateUser);

module.exports = router;
