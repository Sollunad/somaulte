exports.run = (client, message, args) => {
    const commands = client.commands.array();
    let helpString = "";
    commands.forEach(function(command) {
       const help = command.help;
       if (!help) return;
       helpString = helpString.concat(`**${help.usage}**\n${help.desc}\n\n`);
    });
    message.channel.send(helpString);
};

exports.help = {
    usage: 'Soma Help',
    desc: 'Zeigt diese Info an'
};
