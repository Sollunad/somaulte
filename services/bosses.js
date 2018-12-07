const sf = require('snekfetch');

exports.all = getEncounters();

async function getEncounters(){
    const wings = await getWings();
    let encounters = [];

    await wings.forEach(function(wing) {
        const encsFromWing = wing.events.map(getEncID);
        encounters = encounters.concat(encsFromWing);
    });

    return await encounters;
}

async function getWings() {
    const raids = await getRaids();
    let wings = [];

    for (const raid of await raids) {
        const url = await "https://api.guildwars2.com/v2/raids/" + raid;
        const response = await sf.get(url);
        console.log(response.body);
        const wingsFromRaid = await response.body.wings;
        wings = await wings.concat(wingsFromRaid);
    }

    return await wings;
}

async function getRaids() {
    const url = "https://api.guildwars2.com/v2/raids";
    const response = await sf.get(url);
    console.log(response.body);
    return await response.body;
}

function getEncID(enc) {
    return enc.id;
}
