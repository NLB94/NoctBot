const {
    MESSAGES
} = require("../../../util/constants")

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()) == undefined ? client.users.cache.find(m => m.username.toLowerCase() == args[0].toLowerCase()) : message.guild.members.cache.find(m => m.user.username.toLowerCase() == args[0].toLowerCase()).user)) : client.users.resolve(args[0]))) : message.author;

    if (!user || user == '' || user == undefined) return message.channel.send({
        embed: {
            description: 'User not found !'
        }
    })

    message.guild.fetchInvites().then(invites => {
        const userInvites = invites.array().filter(o => o.inviter.id === user.id);
        var userInviteCount = 0;
        for (var i = 0; i < userInvites.length; i++) {
            var invite = userInvites[i];
            userInviteCount += invite.uses;
        }
        message.channel.send({
            embed: {
                description: `${user} have ${userInviteCount} invites.`
            }
        });
    })
}
module.exports.underCat = MESSAGES.COMMANDS;

module.exports.help = MESSAGES.COMMANDS.INVITES.INVITES;