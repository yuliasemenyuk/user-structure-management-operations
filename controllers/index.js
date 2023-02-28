const { ctrlWrapper } = require('../helpers')
const listUsers = require('./listUsers');
const register = require('./register');
const login = require('./login');
const logout = require('./logout')
const changeBoss = require('./changeBoss');

module.exports = {
    listUsers: ctrlWrapper(listUsers),
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    changeBoss: ctrlWrapper(changeBoss)
};