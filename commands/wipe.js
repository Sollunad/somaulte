const Discord = require("discord.js");

exports.run = (client, message, args) => {
    client.userdata.set("arr", []);
    message.channel.send("Done!");
};