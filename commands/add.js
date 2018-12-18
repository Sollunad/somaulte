const Discord = require("discord.js");
const userdata = require('../services/userdata.js');

exports.run = async (client, message, args) => {
    const user = {
        "name": args[0],
        "apikey": args[1]
    };
    const returnMessage = await userdata.add(user);
    message.channel.send(returnMessage);
    message.delete();
};

exports.help = {
    usage: 'Soma Add <name> <key>',
    desc: 'Fügt einen Spieler und Key hinzu'
};
