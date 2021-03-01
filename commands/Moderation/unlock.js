const { MESSAGES } = require('../../util/constants');
const { Guild } = require('../../models/main');

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);
    const x_mark = client.emojis.resolve('806440609127596032');

    const position = settings.lockChannels.map((c) => c.channelID).indexOf(message.channel.id);
    let channelName = message.channel.name;
    if (position == -1) return message.channel.send({embed: { description: `${x_mark}This channel is not lock !`}});

        if (channelName.includes('🔒_')) channelName = channelName.replace('🔒_', '')
        message.channel.edit({ name: channelName });
        message.guild.roles.cache.forEach(role => {
            if (role.permissions.has('MANAGE_MESSAGES')) return;
            else {
            message.channel.updateOverwrite(role.id, { SEND_MESSAGES: null })
        }
        });
        client.unlockChannel(message.guild, message.channel)
        message.channel.send({ embed: { description: '🔓 - Channel unlocked' } })
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNLOCK;