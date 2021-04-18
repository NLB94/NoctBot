const {
    Client,
    Guild
} = require('discord.js')
/**
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    const settings = await client.getGuild(guild);
    const channel = client.guilds.resolve(client.botGuild.logs);
    const ownerMessageDM = `Thanks for adding Noct in your server! \nType **~help** to show all bot's commands \nBot dashboard : Soon... \nJoin support server to get more help : ${client.botGuild.supportInvite}`;
    const owner = await client.users.resolve(guild.ownerID);
    await client.createGuild({
        guildID: guild.id,
    });
    owner.send(ownerMessageDM).catch(() => {})
    channel.send(`New Server : **${guild.name}** ! I am now in **${client.guilds.cache.size}** servers !`)
};