const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const position = settings.lockChannels.map((c) => c.channelID).indexOf(message.channel.id);
    const channel = settings.lockChannels[position];
    if (position !== -1) return message.channel.send('This channel is already lock !');
    else {
        message.guild.roles.cache.forEach(role => {
            if (role.permissions.has('MANAGE_MESSAGES')) return;
            else {
            message.channel.updateOverwrite(role.id, { SEND_MESSAGES: false })
        }
        });

        client.lockChannel(message.guild, message.channel);
        message.channel.send({ embed: { description: '🔒 - Locked Channel' } })
    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.LOCK;