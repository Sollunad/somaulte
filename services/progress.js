const sf = require('snekfetch');
const users = require('../data/userdata.json');
const bosses = require('./bosses.js');

exports.raid = raidProgress();

async function raidProgress() {
    const allBosses = await bosses.all;
    let progress = [];
    for (const user of users) {
        const key = user.key;
        const options = {
            "headers": {
                "Authorization": "Bearer " + key
            }
        };
        const url = 'https://api.guildwars2.com/v2/account/raids';
        const response = await sf.get(url, options);
        const doneBosses = await response.body;

        let checkBosses = [];
        for (const boss of await allBosses) {
            if (await doneBosses.indexOf(boss) !== -1) checkBosses.push("X");
            else checkBosses.push(" ");
        }
        progress.push({name: user.name, progress: checkBosses});
    }
    return progress;
}