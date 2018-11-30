const Discord = require("discord.js");
const dailies = require("../services/dailies.js");

exports.run = async (client, message, args) => {
  const reactionFilter = (reaction, user) => reaction.emoji.name === '✅' || reaction.emoji.name === '❎';
  const emptyString = "Niemand";

  const serverEmojis = message.guild.emojis;
  const daily = await dailies.fractals();
  const dailyString = await serverEmojis.filter(emoji => daily.indexOf(emoji.name) != -1).map(emoji => emoji.toString() + " " + emoji.name).join("\n");

  let embed = await new Discord.RichEmbed({
      title: 'Nächster Fraktal-Run!',
      description: 'Vorschlag: ' + args[0] + ' Uhr',
      thumbnail: {
        url: 'https://wiki.guildwars2.com/images/3/38/Daily_Fractals.png'
      },
      color: 12470271,
      fields: [
          {name: 'Dailies', value: dailyString},
          {name: 'Zugesagt ✅', value: emptyString},
          {name: 'Abgesagt ❎', value: emptyString}
      ]
  });

  // add reaction emoji to message
  await message.channel.send(embed)
  .then(msg => msg.react('✅'))
  .then(r => r.message.react('❎'))
  .then(mReaction => {
      // createReactionCollector - responds on each react, AND again at the end.
      const collector = mReaction.message
          .createReactionCollector(reactionFilter);

      // set collector events
      collector.on('collect', r => {
        let embedYesField = Object.assign({}, embed.fields[1]);
        let embedNoField = Object.assign({}, embed.fields[2]);

        let users = r.users.filter(user => !user.bot);
        if (users.size == 0) return;

        let yes = embedYesField.value.split("\n");
        let no = embedNoField.value.split("\n");

        let reactor = users.first().username;

        if (r.emoji.name === '✅') {
          no = no.filter(user => user != reactor);
          if (yes.indexOf(reactor) == -1) {
            yes.push(reactor);
            yes = yes.filter(user => user != emptyString)
          }
        } else if (r.emoji.name === '❎'){
          yes = yes.filter(user => user != reactor);
          if (no.indexOf(reactor) == -1) {
            no.push(reactor);
            no = no.filter(user => user != emptyString)
          }
        }

        embedYesField.value = yes.join("\n");
        if (embedYesField.value == "") {
          embedYesField.value = emptyString;
        }
        embedNoField.value = no.join("\n");
        if (embedNoField.value == "") {
          embedNoField.value = emptyString;
        }

        // create new embed with old title & description, new field
        const newEmbed = new Discord.RichEmbed({
            title: embed.title,
            description: embed.description,
            thumbnail: {
              url: 'https://wiki.guildwars2.com/images/3/38/Daily_Fractals.png'
            },
            color: 12470271,
            fields: [
              {name: 'Dailies', value: dailyString},
              embedYesField, embedNoField ]
        });

        users.forEach(user => r.remove(user).catch(console.log));

        // edit message with new embed
        // NOTE: can only edit messages you author
        r.message.edit(newEmbed)
        .catch(console.log);
        embed = newEmbed;
      });
  })
  .catch(console.log);
};
