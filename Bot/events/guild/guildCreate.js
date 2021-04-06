const {
    Client,
    Guild
} = require('discord.js')
/**
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    const ownerMessageDM = `Thanks for adding I2Z7 in your server! \nType **~help** to show all bot's commands \nBot dashboard : Soon... \nJoin support server to get more help : ${client.botGuild.supportInvite}`;
    const owner = await client.users.resolve(guild.ownerID);
    await client.createGuild({
        guildID: guild.id,
    }), owner.send(ownerMessageDM).catch(() => {})
};