const Discord = require("discord.js");

let embedObject;

exports.run = (client, message, args) => {
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

      delete require.cache[require.resolve("../services/dailies.js")];
      const dailies = require("../services/dailies.js");
      dailies.fractals.then(fractals => setDailyString(fractals, r.message));

      const collector = r.message
          .createReactionCollector(reactionFilter);

      collector.on('collect', r => {
        if (!r.users.some(user => !user.bot)) return;

        let yes = embedObject.fields[1].value.split("\n");
        let no = embedObject.fields[2].value.split("\n");

        let user = r.users.filter(user => !user.bot).first();
        let reactor = user.username;

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

        embedObject.fields[1].value = yes.join('\n');
        if (embedObject.fields[1].value == '') {
            embedObject.fields[1].value = emptyString;
        }
        embedObject.fields[2].value = no.join('\n');
        if (embedObject.fields[2].value == '') {
            embedObject.fields[2].value = emptyString;
        }

        r.remove(user).catch(console.log);

        const embed = new Discord.RichEmbed(embedObject);
        r.message.edit(embed).catch(console.log);
      });
  })
};

function setDailyString(fractals, message) {
    const serverEmojis = message.guild.emojis;
    const dailyString = serverEmojis.filter(emoji => fractals.indexOf(emoji.name) != -1).map(emoji => emoji.toString() + " " + emoji.name).join("\n");

    embedObject.fields[0].value = dailyString;

    const embed = new Discord.RichEmbed(embedObject);
    message.edit(embed).catch(console.log);
}

exports.help = {
    usage: 'Soma Termin [Uhrzeit]',
    desc: 'Erstellt einen neuen Termin'
};
