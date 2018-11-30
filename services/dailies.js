const sf = require('snekfetch');

async function t4Dailies() {
    const fractals = await getFractals();
    return await fractals.filter(f => f.name.includes("Tier 4")).map(f => f.name.split(' ').slice(3).join(''));
}

async function getFractals() {
    const fDailies = await getDailies();
    const idString = await fDailies.map(a => a.id).join(',');
    const baseUrl = 'https://api.guildwars2.com/v2/achievements?lang=en&ids=';
    const url = await baseUrl + idString;
    const response = await sf.get(url);
    return await response.body;
}

async function getDailies(){
    const url = 'https://api.guildwars2.com/v2/achievements/daily';
    const response = await sf.get(url);
    return await response.body.fractals;
}

exports.fractals = async() => {
   const dailies = await t4Dailies();
   await console.log(dailies);
   return await dailies;
}

