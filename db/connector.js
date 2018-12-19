const config = require("./config.json");
const sql = require('mysql');

exports.query = query;
exports.queryV = queryV;

function query(command) {
  const con = sql.createConnection(config);
  return new Promise( function(resolve, reject) {
    con.query(command, (err,rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
    con.end();
  });
}

function queryV(command, values) {
    return new Promise( (resolve, reject) => {
      con.query(command, values, (err,rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
      con.end();
    });
}
