const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const listUsers = async (req, res) => {
  const { role, _id: boss } = req.user;
  const user = req.user;
  console.log(user);

if (role.includes('admin')) {
    const users = await User.find({}, '-password -token');
      res.json(users);
} else if (role.includes('subordinate') && !role.includes('boss')) {
    res.json(user);
} else if (role.includes('boss')) {
    console.log(user);
    const subordinates = await User.find({ boss }, '-password -token');
    console.log(subordinates);  
    res.json({ user, subordinates: subordinates });
} else {
    throw httpError(400, 'Bad request');
}
};

module.exports = listUsers;
