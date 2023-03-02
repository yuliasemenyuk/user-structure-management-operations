const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const listUsers = async (req, res) => {
  const { role, _id: boss } = req.user;
  const user = req.user;
  console.log(role, boss);

  switch (role) {
    case role.includes('admin'):
        console.log("admin");
      const users = await User.find({}, '-password -token');
      res.json(users);
      break;
    case (role.includes('subordinate')):
        console.log("case");
      res.json(user);
      break;
    case (role.includes('boss')):
    //   const { _id: boss } = req.user;
      const subordinates = await User.find({ boss }, '-password -token');
      res.json({ user, subordinates: subordinates });
      break;
    default:
      throw httpError(400, 'Bad request');
  }
};

module.exports = listUsers;
