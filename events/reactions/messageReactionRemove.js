const { MessageReaction } = require("discord.js");

module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const settings = await client.getGuild(message.guild);
    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const member = message.guild.members.cache.get(user.id);
    const emoji = messageReaction.emoji.name;
    const reactRole = message.guild.roles.cache.get('770658615752261682');
    const rChannel = client.channels.cache.get('776823872544309259');

    if (member.bot) return;

    if (["check_mark_nitro"].includes(emoji) && message.channel.id === rChannel.id) {
        switch (emoji) {
            case "check_mark_nitro":
                member.roles.add(reactRole);
                member.send(`You have to been verified in ${message.guild.name}!`)
            break;
        }
    }
}