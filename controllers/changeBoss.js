const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const changeBoss = async (req, res) => {
  const { userId, newBossId } = req.body;
  const { id, role, _id: boss } = req.user;

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
  if (!newBossChecked) {
    throw httpError(401, `User with ${newBossId} doesn't exist`);
  };
  if (!newBossChecked.role.includes('boss')) {
    newBossChecked.role.push('boss');
    await User.findByIdAndUpdate(newBossId, { role: newBossChecked.role})
  };
  if (newBossChecked.role.includes('admin')) {
    throw httpError(400, 'Admin can`t have subordinates');
  }


  const userToUpdate = await User.findById(userId);
  if (!userToUpdate) {
    throw httpError(401, `User with ${userId} doesn't exist`);
  }
  const currentBossId = userToUpdate.boss;
  if (`${currentBossId}` !== id) {
    throw httpError(403, 'Allowed only for own subordinates');
  };

//   console.log(newBossChecked.boss);
//   console.log(id);

  const updatedUser = await User.findByIdAndUpdate(userId, { boss: newBossId }, 
    {new: true});
  if (!updatedUser) {
    throw httpError(404);
  };

//   if (!newBossChecked.boss) {
//     console.log(newBossChecked);
//     const roleToDel = newBossChecked.role.indexOf(('subordinate'));
//     if (roleToDel !== -1) {
//         newBossChecked.role.splice(roleToDel, 1);
//   };
//   };
  await User.findByIdAndUpdate(newBossId, {
    role:  newBossChecked.role
})

const subordinates = await User.find({ boss })
  if (subordinates.length === 0) {
    const currentUser = await User.findById(req.user.id);
    const roleToDel = currentUser.role.indexOf('boss');
        if (roleToDel !== -1) {
        currentUser.role.splice(roleToDel, 1);
    };

    await User.findByIdAndUpdate(req.user.id, {
        role:  currentUser.role
    })
  }
  
  res.json({
    id: updatedUser.id,
    name: updatedUser.name,
    role: updatedUser.role,
    boss: updatedUser.boss
});
};

module.exports = changeBoss;
