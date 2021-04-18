const {
    MESSAGES
} = require('../../util/constants');
const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    const action = args[0].toLowerCase();
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    if (action == 'on') action.replace('on', 'enable');
    if (action == 'off') action.replace('off', 'disable');

    switch (action) {
        case 'enable': {
            if (settings.automod.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Auto-Moderation **is already enable** !`,
                    title: 'Error !'
                }
            })
            else {
                await client.updateGuild(message.guild, {
                    "automod.enable": true
                })
                message.channel.send({
                    embed: {
                        description: `${check_mark}Successfully **enabled auto-moderation system** !`,
                        title: 'Auto-Moderation'
                    }
                })
            }
            break;
        }
        case 'disable': {
            if (!settings.automod.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Auto-Moderation **is already disable** !`,
                    title: 'Error !'
                }
            })
            else {
                await client.updateGuild(message.guild, {
                    "automod.enable": false
                })
                message.channel.send({
                    embed: {
                        description: `${check_mark}Successfully **disabled auto-moderation system** !`,
                        title: 'Auto-Moderation'
                    }
                })
            }
            break;
        }
    }
}

module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.AUTOMOD;