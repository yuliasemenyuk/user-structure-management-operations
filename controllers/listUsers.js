const { User } = require('../models/userModel');

const listUsers = async (req, res) => {
    const {role} = req.user; 
    const user = req.user;
    console.log(role);
    switch (role) {
        case 'admin':
            const users = await User.find({},  '-password -token' );
            res.json(users)
          break;
        case 'regular':
         
          res.json(user)
          break;
        case 'boss':
            const {_id: boss} = req.user;
            console.log(boss);
            const subordinates = await User.find({boss});
            console.log(subordinates);
            res.json(
                {user,
                subordinates: subordinates}
            )
          break;
        default:
          log('default')
          break;
      }
    // admin

}

module.exports = listUsers;