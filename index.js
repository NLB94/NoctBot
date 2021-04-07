require('dotenv').config();

const Discord = require('discord.js');
// const {
//     GiveawaysManager
// } = require('./util/giveaway/');
const translate = require('@vitalets/google-translate-api');

const botGuild = require('./.bot.json');
const emojis = require('./emojis.json');

// const express = require('express');
// const passport = require("passport");
// const session = require('express-session');
// const cors = require('cors')
// const app = express();
// const port = process.env.PORT || 80;
// const routes = require('./src/routes');
// const {
//     default: Store
// } = require('connect-mongo');

const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: ['GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS', 'GUILD_INTEGRATIONS', 'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS', 'DIRECT_MESSAGE_TYPING', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS']
});
// const manager = new GiveawaysManager(client, {
//     storage: './giveaways.json',
//     updateCountdownEvery: 10000,
//     hasGuildMembersIntent: true,
//     default: {
//         botsCanWin: false,
//         exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
//         embedColor: '#FF0000',
//         reaction: '🎉'
//     }
// });

// client.giveawaysManager = manager;
client.trad = translate;
client.botGuild = botGuild;
client.localEmojis = emojis;
// client.brawlManager = require('./util/brawlstars')(client);

/* client.trad('I need help', {to: 'fr'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});*/

const {
    loadEvents,
    loadCommands
} = require("./util/loader");

// require('./src/strategies/discord')(client);
require('./util/user')(client);

require("./util/guild")(client);
require('./util/message')(client);
require("./util/functions")(client);
require("./util/backup")(client);
require("./util/giveaway")(client);
require("./util/economy")(client);
require("./util/level")(client);

// app.use(express.static("public"))

// app.get('/', (req, res) => {
//     res.send('<h1>Hello<h1/>')
// })

// app.listen(port, () => {console.log('Server is live on port 80 !')})

client.mongoose = require("./util/mongoose");

["commands", "cooldowns"].forEach(x => client[x] = new Discord.Collection());

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));

// app.use(cors({
//     origin: ['http://localhost:3000'],
//     credentials: true
// }))

// app.use(session({
//     store: Store.create({
//         mongoUrl: process.env.DBCONNECTION
//     }),
//     secret: 'secret',
//     cookie: {
//         maxAge: 60000 * 60 * 24
//     },
//     resave: false,
//     saveUninitialized: false,
// }))

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/api', routes);
// app.use('/discord', passport.authenticate('discord'))

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
// });

// app.get('/info', checkAuth, (req, res) => {
//     console.log(req.user.email)
//     res.json(req.user);
// });

// function checkAuth(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.send('not logged in :(');
// }

// app.listen(port, () => console.log(`Server is live on port ${port}`));

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(process.env.TOKEN);

module.exports = {
    client
}

process.on('uncaughtException', (err) => {
    console.log('Erreur attrapé :');
    console.log(err);
})