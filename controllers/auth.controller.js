const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../configs/auth.config");

const signup = async (req, res) => {
  try {
    const { name, email, password, type } = req.body;

    const userObj = {
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    };

    if (type !== undefined) {
      userObj.type = type;
    }

    const user = await User.create(userObj);

    const userResponse = {
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({ success: true, user: userResponse });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //check whether user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Failed! User Id doesnot exist" });
    }

    //validate the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    //on successful login, generate token
    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "30d",
    });

    const userResObj = {
      accessToken: token,
      name: user.name,
      email: user.email,
      type: user.type,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(201).json({ success: true, user: userResObj });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { signup, signin };
