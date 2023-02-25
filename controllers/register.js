const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const register = async (req, res) => {
    const {name, password} = req.body;
    const user = await User.findOne({name});
    if (user) {
        throw httpError(409, 'Such user name already exist')
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();
    
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken
    });

    res.status(201).json({
        name: newUser.name,
        role: newUser.role,
    })
}

module.exports = register;