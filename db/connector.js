const config = require("../config.json");
const sql = require('mysql');
const con = sql.createConnection(config.db);

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    //const command = "INSERT INTO userdata (name, apikey) VALUES ('Nico', '9B354779-9553-194F-B2D8-0CF2A5E3B3A33BDA6689-B084-4619-B697-183252698747')";
    con.query(command, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});