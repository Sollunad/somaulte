const Discord = require("discord.js");

let embed;

exports.run = async (client, message, args) => {
  const reactionFilter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❎';
  const emptyString = "Niemand";

   embed = new Discord.RichEmbed({
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
    });

  // add reaction emoji to message

  message.channel.send(embed)
  .then(msg => msg.react('✅'))
  .then(r => r.message.react('❎'))
  .then(r => {

      delete require.cache[require.resolve("../services/dailies.js")];
      const dailies = require("../services/dailies.js");
      dailies.fractals.then(fractals => setDailyString(fractals, r.message));

      // createReactionCollector - responds on each react, AND again at the end.
      const collector = r.message
          .createReactionCollector(reactionFilter);

      // set collector events
      collector.on('collect', r => {
        let embedYesField = Object.assign({}, embed.fields[1]);
        let embedNoField = Object.assign({}, embed.fields[2]);

        if (!r.users.some(user => !user.bot)) return;

        let yes = embedYesField.value.split("\n");
        let no = embedNoField.value.split("\n");

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

        embedYesField.value = yes.join('\n');
        if (embedYesField.value == '') {
          embedYesField.value = emptyString;
        }
        embedNoField.value = no.join('\n');
        if (embedNoField.value == '') {
          embedNoField.value = emptyString;
        }

        // create new embed with old title & description, new field
        const newEmbed = new Discord.RichEmbed({
            title: embed.title,
            description: embed.description,
            thumbnail: embed.thumbnail,
            color: embed.color,
            fields: [
                embed.fields[0],
              embedYesField, embedNoField
            ]
        });

        r.remove(user).catch(console.log);

        // edit message with new embed
        // NOTE: can only edit messages you author
        r.message.edit(newEmbed).catch(console.log);
        embed = newEmbed;
      });
  })
  .catch(console.log);
};

function setDailyString(fractals, message) {
    const serverEmojis = message.guild.emojis;
    const dailyString = serverEmojis.filter(emoji => fractals.indexOf(emoji.name) != -1).map(emoji => emoji.toString() + " " + emoji.name).join("\n");

    const newEmbed = new Discord.RichEmbed({
        title: embed.title,
        description: embed.description,
        thumbnail: embed.thumbnail,
        color: embed.color,
        fields: [
            {name: 'Dailies', value: dailyString},
            embed.fields[1], embed.fields[2]
        ]
    });

    message.edit(newEmbed).catch(console.log);
    embed = newEmbed;
}

exports.help = {
    usage: 'Soma Termin [Uhrzeit]',
    desc: 'Erstellt einen neuen Termin'
};
