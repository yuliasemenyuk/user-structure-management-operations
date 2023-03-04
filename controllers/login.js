const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { httpError } = require("../helpers");
const { User } = require("../models/userModel");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });

  if (!user) {
    throw httpError(401, "Name or password is wrong");
  };

  const passwordCompare =  await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw httpError(401, "Name or password is wrong");
  };

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1w" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      token,
      id: user._id,
      name: user.name,
      role: user.role,
      boss: user.boss
    },
  });
};

module.exports = login;
