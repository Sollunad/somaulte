const Discord = require("discord.js");
const userdata = require('../services/userdata.js');

exports.run = (client, message, args) => {
    const user = {
        "name": args[0],
        "apikey": args[1]
    };
    userdata.add(user);
    message.channel.send(`User ${user.name} wurde hinzugefügt!`);
    message.delete();
};

exports.help = {
    usage: 'Soma Add <name> <key>',
    desc: 'Fügt einen Spieler und Key hinzu'
};
