const sf = require('snekfetch');

exports.fractals = t4Dailies;

async function t4Dailies() {
    const fractals = await getFractals();
    return fractals.filter(f => f.name.includes('Tier 4')).map(f => f.name.split(' ').slice(3).join(''));
}

async function getFractals() {
    const dailies = await getDailies();
    const fractalDailies = dailies.fractals;
    const idString = fractalDailies.map(a => a.id).join(',');
    const baseUrl = 'https://api.guildwars2.com/v2/achievements?lang=en&ids=';
    const url = baseUrl.concat(idString);
    const response = await sf.get(url);
    return response.body;
}

async function getDailies(){
    const url = 'https://api.guildwars2.com/v2/achievements/daily';
    const response = await sf.get(url);
    return response.body;
}
