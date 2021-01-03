const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
const embed = new MessageEmbed()
.setDescription('[Add Me](https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847) | [Support server](https://discord.gg/92ffufA)')
message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.OTHER.ADDBOT;