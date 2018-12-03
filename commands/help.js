exports.run = (client, message, args) => {
    const commands = client.commands.indexes;
    commands.forEach(function(command) {
       const help = client.commands.get(command).help;
       if (!help) return;
       message.channel.send(`${help.usage}\n${help.desc}\n\n`);
    });
};

exports.help = {
    usage: 'Soma Help',
    desc: 'Zeigt diese Info an'
};
