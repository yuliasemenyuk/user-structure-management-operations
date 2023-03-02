const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const changeBoss = async (req, res) => {
  const { userId, newBossId } = req.body;
  const { id, role } = req.user;

  if (role !== 'boss') {
    throw httpError(403, 'Operation is allowed only for boss');
  };

  const newBossChecked = await User.findById(newBossId);
  if (!newBossChecked.role.includes('boss')) {
    newBossChecked.role.push('boss');
    await User.findByIdAndUpdate(newBossId, { role: newBossChecked.role})
    // throw httpError(400, 'New boss must have a boss role');
  };


  const userToUpdate = await User.findById(userId);
  const currentBossId = userToUpdate.boss;
  if (`${currentBossId}` !== id) {
    throw httpError(403, 'Allowed only for own subordinates');
  };

  if (newBossChecked.boss === '') {
    const roleToDel = newBossChecked.role.IndexOf('subordinate');
    roleToDel !== -1 && newBossChecked.role.splice(roleToDel, 1);
  }

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
