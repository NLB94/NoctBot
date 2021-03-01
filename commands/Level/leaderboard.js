const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message) => {
    const guild = message.guild;
    const settings = await client.getGuild(guild);
    const embed = new MessageEmbed()
    .setAuthor(`${guild.name}`, guild.iconURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
    .setTitle("Server XP Leaderboard")
    .setURL('https://discord.gg/92ffufA')
    .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.avatarURL())
    .setTimestamp();

    await client.getGuildUsers(message.guild).then(p => {
        p.sort((a, b) => ((a.XP + a.level * 999999999999999999999) < (b.XP + b.level * 999999999999999999999)) ? 1 : -1).splice(0, 10).forEach(e => {
            if (e.XP > 0) embed.addField(message.guild.members.cache.find(m => m.id == e.id).user.tag, `Level ${e.level} (${e.XP} XP)`);
        })
    }).catch((err) => {
        
    });
    if (embed.fields.length < 1) embed.setDescription(`Don't have users in leaderboard! Check if level system is enable in your server with \`${settings.general.prefix}enable level\``);
    message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.LEVEL.LEADERBOARD;