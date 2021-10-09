const createUser = require('./createUser');
const validateUser = require('./validateUser');
const login = require('./login');
const getUser = require('./getUser');
const editUser = require('./editUser');
const userVotes = require('./userVotes');
const deleteUser = require('./deleteUser');
module.exports = {
  createUser,
  validateUser,
  login,
  getUser,
  editUser,
  userVotes,
  deleteUser,
};