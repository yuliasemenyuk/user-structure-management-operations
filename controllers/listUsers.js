const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const listUsers = async (req, res) => {
  const { role } = req.user;
  const user = req.user;

  switch (role) {
    case 'admin':
      const users = await User.find({}, '-password -token');
      res.json(users);
      break;
    case 'regular':
      res.json(user);
      break;
    case 'boss':
      const { _id: boss } = req.user;
      const subordinates = await User.find({ boss });
      res.json({ user, subordinates: subordinates });
      break;
    default:
      throw httpError(400, 'Bad request');
  }
};

module.exports = listUsers;
