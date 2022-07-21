const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/** Only the user who is making the api can change hsi password */
const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    const user = await User.findOne({ _id: req.userId });

    user.password = bcrypt.hashSync(password, 8);

    const updatedUser = await user.save();

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/** update user - User and Admin can carry out this task */
const updateUser = async (req, res) => {
  try {
    const { name, email, type } = req.body;
    /** get the userId that needs to be updated from request params */
    const { userId } = req.params;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User Id: ${userId} that you want to update doesn't exist`,
      });
    }

    /** update the user fields */
    user.name = name !== undefined ? name : user.name;
    user.email = name !== undefined ? email : user.email;

    const updatedUser = await user.save();

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  updatePassword,
  updateUser,
};
