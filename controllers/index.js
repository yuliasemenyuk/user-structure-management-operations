const { ctrlWrapper } = require('../helpers')
const listUsers = require('./listUsers');
const register = require('./register');

module.exports = {
    listUsers: ctrlWrapper(listUsers),
    register: ctrlWrapper(register),
};