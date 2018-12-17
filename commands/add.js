const Discord = require("discord.js");

exports.run = (client, message, args) => {
    const user = {
        "name": args[0],
        "key": args[1]
    };
    client.userdata.push("arr", user);
    message.channel.send(`User ${user.name} wurde hinzugefügt!`);
    message.delete();
};

exports.help = {
    usage: 'Soma Add <name> <key>',
    desc: 'Fügt einen Spieler und Key hinzu'
};
