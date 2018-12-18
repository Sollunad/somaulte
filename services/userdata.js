const db = require('../db/connector.js');

exports.add = addUser;
exports.remove = removeUser;
exports.list = listUser;

function addUser(user) {
    const stmt = 'INSERT INTO userdata SET ?';
    db.queryV(stmt, user);
    db.close();
}

function removeUser(name) {
    const stmt = 'DELETE FROM userdata WHERE name = ?';
    db.queryV(stmt, name);
    db.close();
}

async function listUser() {
    const stmt = 'SELECT * FROM userdata ORDER BY name';
    try {
      return await db.query(stmt);
    } catch(e) {
      console.log(e);
    }
    db.close();
}
