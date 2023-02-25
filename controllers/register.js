const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const register = async (req, res) => {
    const {name, password, role, boss} = req.body;
    const user = await User.findOne({name});
    if (user) {
        throw httpError(409, 'Such user name already exist')
    };

    const bossId = await User.findById(boss);
    if (bossId.role !== 'boss') {
        console.log(bossId);
        throw httpError(409, `ID ${boss} not belong to any boss`)
    };

    if (role === 'regular' && !boss) {
        throw httpError(409, 'Field "boss" is required for regular user')
    };

    if (role !== 'regular' && boss) {
        throw httpError(409, 'Field "boss" is not needed for this type of user')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken
    });

    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        role: newUser.role,
        bossId: newUser.boss
    })
}

module.exports = register;