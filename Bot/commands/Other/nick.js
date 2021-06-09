const {
    MESSAGES
} = require('../../../util/constants');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
    const check_mark = client.emojis.resolve(client.localEmojis.checkMark);

    try {
        const user = args[1] ? (args[1].startsWith('<@') && args[1].endsWith('>') ? message.mentions.users.first() : (isNaN(args[1]) ? (args[1].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[1].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[1].toLowerCase()))) : client.users.resolve(args[1]))) : message.author;
        if (user == undefined) return message.channel.send({
            embed: {
                description: `${x_mark}User not found !`
            }
        })

        if (user.id !== message.author.id && (!message.member.permissions.has('MANAGE_NICKNAMES') || message.member.roles.highest.position < member)) return message.channel.send({ embed: { description: `${x_mark} You don't have enough permissions to change this user nickname !` }})

        const member = message.guild.members.resolve(user);
        if (!member) return message.channel.send({
            embed: {
                description: `${x_mark}User not in this server!`
            }
        });

        if (user.id !== message.author.id && (!message.member.permissions.has('MANAGE_NICKNAMES') || message.member.roles.highest.position < member.roles.highest.position)) return message.channel.send({ embed: { description: `${x_mark} You don't have enough permissions to change this user nickname !` }})

        if (member.roles.highest.position > message.guild.me.roles.highest.position) return message.channel.send({
            embed: {
                description: `${x_mark}Please put my highest role upper than yours and retry !`
            }
        })
        const newNickname = args[0] ? (args[0].toLowerCase() == 'reset' ? user.username : args[0]) : user.username;
        member.setNickname(`${newNickname}`).then(() => {
            message.channel.send({ 
                embed: {
                    description: `Successfully changed ${user} nickname to ${newNickname} !`,
                    author: message.author.tag,
                    authorIcon: message.author.avatarURL()
                }
            })
        }).catch(err => message.channel.send({ embed: { title: 'Error !', description: `Cannot change user's nickname ! \nThe error is : \`${err}\`` }}))
    } catch (e) {
        // console.log(e);
        message.channel.send({ embed: { title: 'Error !', description: `Cannot change user's nickname ! \nMissing permissions !` }})
    }

}
module.exports.underCat = MESSAGES.COMMANDS;

module.exports.help = MESSAGES.COMMANDS.OTHER.NICK;