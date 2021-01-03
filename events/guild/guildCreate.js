module.exports = async (client, guild) => {
    const ownerMessageDM = "Thanks for adding I2Z7 in your server! \nType **~help** for all bot's commands \nBot website : Soon... \nNeed more help ? Join support server : https://discord.gg/92ffufA";
    const owner = client.users.cache.get(guild.ownerID);
    await client.createGuild({
        guildID: guild.id,
    }), owner.send(ownerMessageDM)
};