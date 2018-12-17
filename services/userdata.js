const db = require('../db/connector.js');

exports.add = addUser;
exports.remove = removeUser;
exports.list = listUser;

async function addUser(user) {
    const stmt = 'INSERT INTO userdata SET ?';
    db.queryV(stmt, user);
}

async function removeUser(name) {
    const stmt = 'DELETE FROM userdata WHERE name = ?';
    db.queryV(stmt, name);
}

async function listUser() {
    const stmt = 'SELECT * FROM userdata';
    try {
      return await db.query(stmt);
    } catch(e) {
      console.log(e);
    }
}
