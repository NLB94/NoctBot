const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../util/constants");

const functions = require('../../util/functions');

module.exports.run = functions.run = async (client, message) => {
    const settings = await client.getGuild(message.guild);
          const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle("I2Z7#3148")
          .setURL('https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription('[Add Me](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) | [Support Server](https://discord.gg/92ffufA)')
          .addFields(
              { name: '• ID', value: '735824367698837555', inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Owner', value: 'ηLβ 94', inline: true},
              { name: '• Bot Servers Count :', value: `${client.guilds.cache.size}`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Bot Members Count :', value: `${client.users.cache.size}`, inline: true},
              { name: '• Uptime', value: `${Math.floor(client.uptime / 1000 / 60).toString()} minutes`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: '• Memory', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true},
          )
          .setTimestamp()
          .setFooter("By ηLβ 94");
          
          message.channel.send(embed);
    };

module.exports.help = MESSAGES.COMMANDS.INFO.BOTINFO;