const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const changeBoss = async (req, res) => {
  const { userId, newBossId } = req.body;
  const { id, role } = req.user;

  if (role !== 'boss') {
    throw httpError(403, 'Operation is allowed only for boss');
  };

  const newBossChecked = await User.findById(newBossId);
  if (newBossChecked.role !== 'boss') {
    throw httpError(400, 'New boss must have a boss role');
  }

  const userToUpdate = await User.findById(userId);
  const currentBossId = userToUpdate.boss;
  if (`${currentBossId}` !== id) {
    throw httpError(403, 'Allowed only for own subordinates');
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
