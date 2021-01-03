module.exports = (client, guild) => {
    client.users.cache.get('616547009750499358').send(`I've left a guild : ${guild.name}. Now I am in ${client.guilds.cache.size} servers! `);
    }