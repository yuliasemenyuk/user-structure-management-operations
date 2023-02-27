const { User } = require('../models/userModel');

const listUsers = async (req, res) => {
    console.log('boo');
    // admin
    const users = await User.find();
    res.json(users)
}

module.exports = listUsers;