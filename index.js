require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

const { loadEvents, loadCommands } = require("./util/loader");

const functions = require('./index');

require('./src/strategies/discord');

require("./util/functions")(client);
require("./util/guild")(client);
require("./util/backup")(client);
require("./util/giveaway")(client);
require("./util/economy")(client);
require("./util/level")(client);

client.mongoose = require("./util/mongoose");

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());

loadCommands(client);
loadEvents(client);
client.mongoose.init();
 
client.login(process.env.TOKEN);