const { MESSAGES } = require('../../util/constants');
const { Guild } = require('../../models/main');

module.exports.run = async (client, message, args) => {
    const settings = await client.getGuild(message.guild);

    const position = settings.lockChannels.map((c) => c.channelID).indexOf(message.channel.id);
    const channel = settings.lockChannels[position];
    if (position == -1) return message.channel.send('This channel is not lock !');
    else {
        message.channel.edit({ name: channel.channelName, permissionOverwrites: channel.permissions });
        Guild.updateOne({ guildID: message.guild.id }, { "channel": null });
        message.channel.send({ embed: { description: '🔒 - Channel unlocked' } })
    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNLOCK;