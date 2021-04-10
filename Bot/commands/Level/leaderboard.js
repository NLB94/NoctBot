const {
    MessageEmbed
} = require("discord.js");
const {
    MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {

    const language = settings.general.language;
    const levelTrad = await client.translate('Level', 'en', language)
    const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL(), `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join`)
        .setTitle(await client.translate("Server's XP Leaderboard", 'en', language))
        .setURL(`${client.botGuild.supportInvite}`)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();

    await client.getGuildUsers(message.guild).then(p => {
        p.sort((a, b) => ((a.XP + (a.level * 999999999999999999999)) < (b.XP + (b.level * 999999999999999999999))) ? 1 : -1).splice(0, 10).forEach(e => {
            if (e.XP > 0) embed.addField(message.guild.members.cache.find(m => m.id == e.id).user.tag, `${levelTrad} ${e.level} - ${e.XP} XP`);
        })
    }).catch((err) => {

    });
    if (embed.fields.length < 1) embed.setDescription(`${await client.translate("Don't have users in leaderboard! Check if level system is enable in your server with", 'en', language)} \`${settings.general.prefix}enable level\``);
    message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.LEVEL.LEADERBOARD;