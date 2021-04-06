const {
    MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    const action = args[0].toLowerCase();
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    if (action == 'on') action.replace('on', 'enable');
    if (action == 'off') action.replace('off', 'disable');

    switch (action) {
        case 'enable': {
            if (!settings.automod.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Auto-Moderation **is not enable** ! Type \`${settings.general.prefix}automod enable\` and **retry !**`,
                    title: 'Error !'
                }
            })
            else {
                if (settings.automod.antiLink.enable) return message.channel.send({
                    embed: {
                        description: `${x_mark} Anti-link **is already enable** !`,
                        title: 'Error !'
                    }
                });
                await client.updateGuild(message.guild, {
                    "automod.antiLink.enable": true
                })
                message.channel.send({
                    embed: {
                        description: `${check_mark}Successfully **enabled anti-link system** !`,
                        title: 'Auto-Moderation'
                    }
                })
            }
            break;
        }
        case 'disable': {
            if (!settings.automod.antiLink.enable) return message.channel.send({
                embed: {
                    description: `${x_mark} Anti-link **is already disable** !`,
                    title: 'Error !'
                }
            });
            await client.updateGuild(message.guild, {
                "automod.antiLink.enable": false
            })
            message.channel.send({
                embed: {
                    description: `${check_mark}Successfully **disabled anti-link system** !`,
                    title: 'Auto-Moderation'
                }
            })
            break;
        }
    }
}

module.exports.help = MESSAGES.COMMANDS.SERVERSETTINGS.ANTILINK;