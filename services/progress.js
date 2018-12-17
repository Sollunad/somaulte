const sf = require('snekfetch');
const bosses = require('./bosses.js');
const userdata = require('./userdata.js');

exports.raid = raidProgress;

async function raidProgress() {
    const allBosses = await bosses.all;
    const users = await userdata.list();
    let progress = [];
    for (const user of await users) {
        const key = user.apikey;
        const response = await fetchProgress(key);
        const doneBosses = await response.body;

        let xArray = [];
        for (const boss of await allBosses) {
            if (await doneBosses.indexOf(boss) !== -1) xArray.push("X");
            else xArray.push(" ");
        }
        progress.push({name: user.name, progress: xArray});
    }
    return progress;
}

async function fetchProgress(key) {
    const options = {
        "headers": {
            "Authorization": "Bearer " + key
        }
    };
    const url = 'https://api.guildwars2.com/v2/account/raids';
    return await sf.get(url, options);
}
