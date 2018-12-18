const db = require('../db/connector.js');

exports.add = addUser;
exports.remove = removeUser;
exports.list = listUser;

async function addUser(user) {
    const stmt = 'INSERT INTO userdata SET ?';
    try {
      await db.queryV(stmt, user);
      return `User ${user.name} wurde hinzugefügt!`;
    } catch(e) {
      return `Fehler beim Hinzufügen von ${user.name}. Gibt es diesen Namen schon?``;
    }
}

function removeUser(name) {
    const stmt = 'DELETE FROM userdata WHERE name = ?';
    db.queryV(stmt, name);
}

async function listUser() {
    const stmt = 'SELECT * FROM userdata ORDER BY name';
    try {
      return await db.query(stmt);
    } catch(e) {
      console.log(e);
    }
}
