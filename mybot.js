const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'ulte') {
        message.channel.send("Soma Ulte?");
    } else if (command === 'help') {
        message.channel.send("Noch keine Hilfe für dich :c");
    } else if (command === 'nani' || command === 'nani?') {
        message.channel.send("Fucking weebs");
    } else if (command === '?') {
        let text = args.join(" ");
        message.channel.send("Soma " + text + "?");
    }
});

client.login(config.token);