const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const changeBoss = async (req, res) => {
  const { userId, newBossId } = req.body;
  const { id, role } = req.user;

  if (!role.includes('boss')) {
    throw httpError(403, 'Operation is allowed only for boss');
  };

  if (newBossId === userId) {
    throw httpError(403, 'Subordinate and boss can`t be the same');
  };

  if (newBossId === id) {
    throw httpError(403, 'Current and new boss can`t be the same');
  }

  const newBossChecked = await User.findById(newBossId);
  if (!newBossChecked.role.includes('boss')) {
    newBossChecked.role.push('boss');
    await User.findByIdAndUpdate(newBossId, { role: newBossChecked.role})
  };
  if (newBossChecked.role.includes('admin')) {
    throw httpError(400, 'Admin can`t have subordinates');
  }


  const userToUpdate = await User.findById(userId);
  const currentBossId = userToUpdate.boss;
  if (`${currentBossId}` !== id) {
    throw httpError(403, 'Allowed only for own subordinates');
  };

  if (newBossChecked.boss === '') {
    const roleToDel = newBossChecked.role.IndexOf('subordinate');
    roleToDel !== -1 && newBossChecked.role.splice(roleToDel, 1);
  };

  const updatedUser = await User.findByIdAndUpdate(userId, { boss: newBossId }, 
    {new: true});
  if (!updatedUser) {
    throw httpError(404);
  };

  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    role: updatedUser.role,
    boss: updatedUser.boss
});
};

module.exports = changeBoss;
