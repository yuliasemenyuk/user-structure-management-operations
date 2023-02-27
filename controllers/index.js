const { ctrlWrapper } = require('../helpers')
const listUsers = require('./listUsers');
const register = require('./register');
const login = require('./login');

module.exports = {
    listUsers: ctrlWrapper(listUsers),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
};