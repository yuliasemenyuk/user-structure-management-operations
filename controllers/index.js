const { ctrlWrapper } = require('../helpers')
const { listUsers } = require('./listUsers');

module.exports = {
    listUsers: ctrlWrapper(listUsers)
};