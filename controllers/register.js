const bcrypt = require('bcryptjs');
const { httpError } = require('../helpers');
const { User } = require('../models/userModel');

const register = async (req, res) => {
    const {name, password, role, boss} = req.body;
    const user = await User.findOne({name});
    if (user) {
        throw httpError(409, 'Such user name already exist')
    };
    
    let autoRole = [];
    if (role !== 'admin' && boss !== undefined) { 
        autoRole.push('subordinate')
    } else {
        autoRole = role;
    };
    
    if (boss) {
            const bossChecked = await User.findById(boss);
            if (bossChecked.role.includes('admin')) {
                throw httpError(409, `ID ${boss} belongs to admin. Admin cannot have subordinates`)
            };
            if (!bossChecked.role.includes('boss')) {
                bossChecked.role.push('boss');
                await User.findByIdAndUpdate(boss, { role: bossChecked.role})
             };
        }
    if (role === 'subordinate' && !boss) {
            throw httpError(409, 'Field "boss" is required for subordinate')
        };

    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        role: autoRole
    });

    res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        subordinates: newUser.subortinates,
        role: newUser.role,
        boss: newUser.boss
    })
}

module.exports = register;