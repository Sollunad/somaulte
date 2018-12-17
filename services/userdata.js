const db = require('../db/connector.js');

exports.add = addUser;
exports.remove = removeUser;
exports.list = listUser;

async function addUser(name, key) {
    const stmt = 'INSERT INTO userdata SET ?';
    const values = {
        name: name,
        apikey: key
    }
    db.queryV(stmt, values);
}

async function removeUser(name) {
    const stmt = 'DELETE FROM userdata WHERE name = ?';
    db.queryV(stmt, name);
}

async function listUser() {

}

