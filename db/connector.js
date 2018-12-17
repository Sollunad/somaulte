const config = require("./config.json");
const sql = require('mysql');
const con = sql.createConnection(config);

exports.close = close;
exports.query = query;
exports.queryV = queryV;

function query(command) {
  return new Promise( function(resolve, reject) {
    con.query(command, (err,rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function queryV(command, values) {
    return new Promise( (resolve, reject) => {
      con.query(command, values, (err,rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
}

function close() {
    con.close();
}
