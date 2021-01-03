const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
    message.delete();
    const embed = new MessageEmbed()
    .setTitle('New Poll')
    .setColor("#000000")
    .setDescription(args.join(" "))
    .setFooter(`${message.author.tag}`, message.author.displayAvatarURL());
    
    message.channel.send(embed).then(async msg => {
    await msg.react('✅');
    await msg.react('〰️');
    await msg.react('❌');
}).catch(err => '');
};




module.exports.help = MESSAGES.COMMANDS.OTHER.POLL;