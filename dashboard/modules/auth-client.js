const OAuthClient = require('disco-oauth');
const config = process.env;

const client = new OAuthClient(config.CLIENT_ID, config.CLIENT_SECRET);
client.setRedirect(`http://localhost/auth`);
client.setScopes('identify', 'guilds', 'email');

module.exports = client;