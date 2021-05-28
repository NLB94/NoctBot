const {
    MESSAGES
} = require('../../util/constants');
const fnc = require('../../util/functions');

module.exports.run = fnc.run = async (client, message, args, settings, userInfo) => {
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);

    const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
    if (user == undefined) return message.channel.send({
        embed: {
            description: `${x_mark}User not found !`
        }
    })
    if (user.bot) return message.channel.send("Bots can't receive experience!");

    const member = message.guild.members.resolve(user);
    if (!member) return message.channel.send({
        embed: {
            description: `${x_mark}User not in this server!`
        }
    });

    if (user !== message.author && user !== message.member) userInfo = await client.getGuildUser(message.guild, member)
    if (userInfo == undefined) await client.createGuildUser(message.guild, user);

    let reason = args.slice(1).join(" ");

    if (member.hasPermission('ADMINISTRATOR')) return message.channel.send({ 
        embed: {
            description: `${x_mark}You can't warn a moderator !`
        }
    });
    else {
        const caseNb = (settings.moderation.case.length + 1);
        if (!reason) reason = 'Unspecified';
        await client.updateGuildUI(message.guild, member, {
            "users.$.warns": (parseInt(userInfo.warns) + 1)
        });
        await client.createCase(message.guild, {
            type: 'Warn',
            id: caseNb,
            reason,
            moderatorID: message.author.id,
            userID: user.id
        }, settings)
        message.channel.send({
            embed: {
                title: `Case#${caseNb}`,
                description: `${checkMark}${user} **has been warned**\nReason : ${reason}`,
                footer: (message.author.tag, message.author.avatarURL()),
            }
        })
    }
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.WARN;