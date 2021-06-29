const {
    MessageEmbed
} = require('discord.js');
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

    
    const roles = [];
    const users = [];
    const checkMark = client.emojis.resolve(client.localEmojis.checkMark);
    const mentionsRoles = message.mentions.roles;
    const mentionsUsers = message.mentions.users;
    mentionsRoles.forEach(role => {
        mentionsUsers.forEach(m => {
            const member = message.guild.members.resolve(m)
            member.roles.remove(role.id).catch()
        });
        roles.push({
            id: role.id
        });
    });
    mentionsUsers.forEach(m => users.push({ id: m.id }))

    if (roles.length < 1 || users.length < 1) return message.channel.send({
        embeds: [{
            title: 'Invalid Usage',
            description: `Correct usage : ${settings.general.prefix}${module.exports.help.name} ${module.exports.help.usage}`
        }]
    })
    const embed = new MessageEmbed()
        .setTitle('Roles')
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`${checkMark}Successfully removed ${roles.map(a => `<@&${a.id}>`).slice(0, 10).join(", ")} from ${users.map(a => `<@${a.id}>`).slice(0, 10).join(", ")} !`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

    await message.channel.send({embeds: [embed]})
};
module.exports.underCat = MESSAGES.COMMANDS.MODERATION.ROLES;

module.exports.help = MESSAGES.COMMANDS.MODERATION.ROLES.REMROLE;