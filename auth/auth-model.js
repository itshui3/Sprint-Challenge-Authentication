const db = require('../database/dbConfig');

module.exports = {
  find, 
  findById, // findById(id)
  findByUsername, // findByUsername(username)
  registerUser, // registerUser(user)
}

function find() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id }).first();
}

function findByUsername(username) {
  return db('users').where({ username }).first();
}

function registerUser(user) {
  return db('users').insert(user)
    .then( ids => {
      return db('users').where({ id: ids[0] })
    })
}