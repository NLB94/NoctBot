const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message) => {
    const guild = message.guild;
    const embed = new MessageEmbed()
    .setAuthor(`${guild.name}`, guild.iconURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
    .setTitle("Server XP Leaderboard")
    .setURL('https://discord.gg/92ffufA')
    .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.avatarURL())
    .setTimestamp();

    await client.getUsers(message.guild).then(p => {
        p.sort((a, b) => (a.XP < b.XP) ? 1 : -1).splice(0, 10).forEach(e => {
            if (e.XP > 0) embed.addField(e.tag, `Level ${e.level} (${e.XP} XP)`);
        })
    }).catch((err) => {
        
    });
    message.channel.send(embed);
    
};



module.exports.help = MESSAGES.COMMANDS.LEVEL.LEADERBOARD;