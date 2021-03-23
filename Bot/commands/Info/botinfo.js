const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message) => {
    const settings = await client.getGuild(message.guild);
    const language = settings.general.language
          const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle("I2Z7#3148")
          .setURL('https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`[${await client.translate('Add Me', 'en', language)}](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) | [${await client.translate('Support Server', 'en', language)}](https://discord.gg/92ffufA)`)
          .addFields(
              { name: '• ID', value: '735824367698837555', inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `• ${await client.translate('Owner', 'en', language)}`, value: 'ηLβ 94', inline: true},
              { name: `• ${await client.translate('Bot Servers Count', 'en', language)} :`, value: `${client.guilds.cache.size}`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `• ${await client.translate('Bot Members Count', 'en', language)} :`, value: `${client.users.cache.size}`, inline: true},
              { name: `• ${await client.translate('Uptime', 'en', language)}`, value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `• ${await client.translate('Memory', 'en', language)}`, value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true},
          )
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());
          
          message.channel.send(embed);
    };

module.exports.help = MESSAGES.COMMANDS.INFO.BOTINFO;