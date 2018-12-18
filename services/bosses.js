const sf = require('snekfetch');

exports.all = getEncounters();

async function getEncounters(){
    const wings = await getWings();
    let encounters = [];

    wings.forEach(function(wing) {
        const encsFromWing = wing.events.map(getEncID);
        encounters = encounters.concat(encsFromWing);
    });

    return encounters;
}

async function getWings() {
    const raids = await getRaids();
    let wings = [];

    for (const raid of raids) {
        const url = "https://api.guildwars2.com/v2/raids/" + raid;
        const response = await sf.get(url);
        const wingsFromRaid = response.body.wings;
        wings = wings.concat(wingsFromRaid);
    }

    return wings;
}

async function getRaids() {
    const url = "https://api.guildwars2.com/v2/raids";
    const response = await sf.get(url);
    return response.body;
}

function getEncID(enc) {
    return enc.id;
}
