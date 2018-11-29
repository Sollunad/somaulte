const Discord = require("discord.js");

const embed = new Discord.RichEmbed()
  .setImage("https://cdn.discordapp.com/attachments/368134817927135233/517791301727551488/unknown.png");

exports.run = (client, message, args) => {
    message.channel.send({embed});
}
