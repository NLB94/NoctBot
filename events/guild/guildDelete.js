module.exports = (client, guild) => {
    client.users.resolve('616547009750499358').send({embed: {description: `I've left a guild : ${guild.name}. Now I am in ${client.guilds.cache.size} servers! `}});
}