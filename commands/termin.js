const Discord = require("discord.js");
const dailies = require("../services/dailies.js");

let embedObject;

exports.run = (client, message, args) => {
  if (!message.guild) return;
  const reactionFilter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❎';
  const emptyString = "Niemand";

  embedObject = {
      title: 'Nächster Fraktal-Run!',
      description: `Vorschlag: **${args[0]} Uhr**`,
      thumbnail: {
          url: 'https://wiki.guildwars2.com/images/3/38/Daily_Fractals.png'
      },
      color: 12470271,
      fields: [
          {name: 'Dailies', value: "Lädt..."},
          {name: 'Zugesagt ✅', value: emptyString},
          {name: 'Abgesagt ❎', value: emptyString}
      ]
  };

  const embed = new Discord.RichEmbed(embedObject);

  message.channel.send(embed)
  .then(msg => msg.react('✅'))
  .then(r => r.message.react('❎'))
  .then(r => {

      dailies.fractals().then(fractals => setDailyString(fractals, r.message));

      const collector = r.message
          .createReactionCollector(reactionFilter);

      collector.on('collect', r => {
        if (!r.users.some(user => !user.bot)) return;

        let yesField = embedObject.fields[1];
        let noField = embedObject.fields[2];

        let yes = yesField.value.split("\n");
        let no = noField.value.split("\n");

        const user = r.users.filter(user => !user.bot).first();
        const reactor = user.username;

        //TODO u.equals?
        if (r.emoji.name === '✅') {
          no = no.filter(u => u != reactor);
          if (yes.indexOf(reactor) == -1) {
            yes.push(reactor);
            yes = yes.filter(u => u != emptyString);
          }
        } else if (r.emoji.name === '❎'){
          yes = yes.filter(u => u != reactor);
          if (no.indexOf(reactor) == -1) {
            no.push(reactor);
            no = no.filter(u => u != emptyString)
          }
        }

        yesField.value = yes.sort().join('\n');
        if (yesField.value == '') {
            yesField.value = emptyString;
        }
        noField.value = no.sort().join('\n');
        if (noField.value == '') {
            noField.value = emptyString;
        }

        r.remove(user).catch(console.log);

        const embed = new Discord.RichEmbed(embedObject);
        r.message.edit(embed).catch(console.log);
      });
  });
  message.delete();
};

function setDailyString(fractals, message) {
    const serverEmoji = message.guild.emojis;
    embedObject.fields[0].value = serverEmoji.filter(emoji => fractals.indexOf(emoji.name) !== -1).map(emoji => emoji.toString() + " " + emoji.name).join("\n");
    const embed = new Discord.RichEmbed(embedObject);
    message.edit(embed).catch(console.log);
}

exports.help = {
    usage: 'Soma Termin <Uhrzeit>',
    desc: 'Erstellt einen neuen Termin'
};
