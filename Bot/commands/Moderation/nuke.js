const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {
    // A FAIRE ICIIIIIIIIIIIIII
    const channel = message.channel;
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark)
    if (channel.id == message.guild.rulesChannelID) return message.channel.send({
        embeds: [{
            description: `${x_mark}I can't nuke the rules channel.`
        }]
    });
    else if (channel.id == message.guild.systemChannelID) return message.channel.send({
        embeds: [{
            description: `${x_mark}I can't nuke a system channel.`
        }]
    });
    else if (channel.id == message.guild.publicUpdatesChannelID) return message.channel.send({
        embeds: [{
            description: `${x_mark}I can't nuke an update channel.`
        }]
    });
    switch (channel.type) {
        case 'news': {
            if (channel.type == 'news') {
                return message.channel.send({
                    embeds: [{
                        description: `${x_mark}I can't nuke a news channel.`
                    }]
                });
            }
            break;
        }
        case 'store': {
            if (channel.type == 'store') {
                return message.channel.send({
                    embeds: [{
                        description: `${x_mark}I can't nuke a store channel.`
                    }]
                });
            }
            break;
        }
        case 'text': {
            if (channel.type == 'text') {
                const position = channel.position;
                const name = channel.name;
                await channel.send('Nuking...');

                await channel.clone({
                    name: 'Nuking...'
                }).then(async (c) => {
                    await channel.delete('Nuked this channel');
                    await c.send(`${check_mark}Successfully nuked this channel!`).then(msg => {
                        setTimeout(() => {
                            msg.delete()
                        }, 5000);
                    }).catch(() => '');
                    setTimeout(() => {
                        c.edit({
                            name: `${name}`,
                            position: position
                        })
                    }, 1500);
                });
            }
            break;
        };
    };
}
module.exports.underCat = MESSAGES.COMMANDS.MODERATION.CHANNELMANAGER;

module.exports.help = MESSAGES.COMMANDS.MODERATION.CHANNELMANAGER.NUKE;