"use strict";

const {
    Client,
    Guild
} = require('discord.js');

/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
module.exports = async (client, guild) => {
    const channel = await client.guilds.resolve(client.botGuild.supportGuildID).channels.resolve(client.botGuild.guildCreateDelLogs);
    await channel.send({
        embed: {
            description: `:cry: I've left a guild : ${guild.name}. Now I am in ${client.guilds.cache.size} servers ! `
        }
    });
}
