const config = require("./config.json");
const sql = require('mysql');
const con = sql.createConnection(config);

exports.query = query;
exports.queryV = queryV;
exports.close = close;

con.connect(function(err) {
    if (err) throw err;
});

function query(command) {
    con.query(command, responseHandler);
}

function queryV(command, values) {
    con.query(command, values, responseHandler);
}

function close() {
    con.close();
}

function responseHandler(err, result) {
    if (err) console.log(err);
    else return result;
}