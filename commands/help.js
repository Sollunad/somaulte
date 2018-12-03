exports.run = (client, message, args) => {
    const commands = client.commands.array();
    commands.forEach(function(command) {
       const help = command.help;
       if (!help) return;
       message.channel.send(`**${help.usage}**\n${help.desc}\n\n\n`);
    });
};

exports.help = {
    usage: 'Soma Help',
    desc: 'Zeigt diese Info an'
};
