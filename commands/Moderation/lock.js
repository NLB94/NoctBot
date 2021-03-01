const { MESSAGES } = require('../../util/constants');

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    message.guild.roles.cache.forEach(async role => {
        if (role.permissions.has('MANAGE_MESSAGES')) return;
        else {
            await message.channel.updateOverwrite(role.id, { SEND_MESSAGES: false })
        }
    });

    message.channel.edit({name: `🔒_${message.channel.name}`})
    client.lockChannel(message.guild, message.channel);
    message.channel.send({ embed: { description: '🔒 - Locked Channel' } });
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.LOCK;