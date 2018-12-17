//TODO: wingEncs aus API auslesen
const wingEncs = [4,3,4,4,4,3];
const maxWing = wingEncs.length;
const progress = require("../services/progress.js");
const bosses = require("../data/bosses.json");
const printer = require("../util/printProgress.js");

exports.run = async (client, message, args) => {
    const [start, end] = getEncId(args[0]);
    console.log(start + " " + end);
    const raidProgress = await progress.raid(client.userdata.get("arr"));
    let output = [];
    let title = ['Boss'].concat(bosses.slice(start, end));
    const maxLength = title.map(e => e.length).reduce(max, 0);
    title = title.map(e => e.padStart(maxLength, ' '));
    output.push(title);
    for (const user of await raidProgress) {
        const row = [await user.name].concat(await user.progress.slice(start, end));
        output.push(await row);
    }
    message.channel.send(printer.print(await output));
};

function getEncId(wing) {
    if (!wing || wing === 0 || wing > maxWing) return [0, wingEncs.reduce(add, 0)];
    const start = wingEncs.slice(0, wing - 1).reduce(add, 0);
    const end = wingEncs.slice(0, wing).reduce(add, 0);
    return [start, end];
}

function add(a, b) {
    return a + b;
}

exports.help = {
    usage: 'Soma Progress',
    desc: 'Zeigt den Raid-Progress aller hinterlegten Spieler an'
};

function max(a, b) {
    return a > b? a : b;
}
