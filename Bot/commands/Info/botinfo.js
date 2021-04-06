const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
    
    const language = settings.general.language;
          const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle(client.user.tag)
          .setURL('https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`[${language == 'fr' ? 'Ajoute-moi' : 'Add me'}](https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join) | [${language == 'fr' ? 'Serveur de support' : 'Support server'}](https://discord.gg/92ffufA)`)
          .addFields(
              { name: '• ID', value: '735824367698837555', inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `• ${language == 'fr' ? 'Fondateur' : 'Owner'} :`, value: (await client.fetchApplication()).owner.tag, inline: true},
              { name: `• ${language == 'fr' ? 'Librairie' : 'Library'} :`, value: '[Discord.js](https://discord.js.org/#/)', inline: false},
              { name: `• ${language == 'fr' ? 'Nombre de serveurs' : 'Servers Count'} :`, value: `**${client.guilds.cache.size}**`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              { name: `• ${language == 'fr' ? 'Nombre de membres' : "Members Count"} :`, value: `**${client.users.cache.size}**`, inline: true},
              { name: `• ${language == 'fr' ? 'En ligne depuis' : 'Uptime'} :`, value: `**${Math.floor(client.uptime / 1000 / 60).toString()}** minutes`, inline: true},
              { name: '\u200b', value: '\u200b', inline: true},
              message.author.id == client.botGuild.ownerID ? { name: `• ${language == 'fr' ? 'Memoire' : 'Memory'} :`, value: `**${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}** MB`, inline: true} : '',
          )
          .setTimestamp()
          .setFooter(message.author.username, message.author.avatarURL());
          
          message.channel.send(embed);
    };

module.exports.help = MESSAGES.COMMANDS.INFO.BOTINFO;