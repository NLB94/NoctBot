const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

  
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve(client.localEmojis.checkMark)

  const language = settings.general.language
  const support = args[0] == 'bank' || args[0] == 'cash' ? args[0].toLowerCase() : 'cash';
  const users = [];
  const role = args[0].startsWith('<@&') && args[0].endsWith('>') || args[1].startsWith('<@&') && args[1].endsWith('>') ? message.guild.roles.cache.find(r => r.id == message.mentions.roles.first().id) : (args[0] == 'bank' || args[0] == 'cash' ? (isNaN(args[1]) ? message.guild.roles.cache.find(r => r.name == args[1]) : message.guild.roles.cache.find(r => r.id == args[1])) : (isNaN(args[0]) ? message.guild.roles.cache.find(r => r.name == args[0]) : message.guild.roles.cache.find(r => r.id == args[0])));
  const correctUsage = `${x_mark}${'Correct usage'} : \`${settings.general.prefix}addmoneyrole ${module.exports.help.usage}\``

  if (!role) return message.channel.send({
    embed: {
      description: correctUsage
    }
  });
  const toAdd = isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
  if (isNaN(toAdd)) return message.channel.send({
    embed: {
      description: correctUsage
    }
  });
  message.guild.members.cache.map(m => users.push(m));
  users.forEach(async user => {
    if (!user.roles.cache.find(r => r.id == role)) return;
    else {
      const dbUser = await client.getGuildUser(message.guild, user);
      if (!dbUser) await client.createGuildUser(message.guild, user);


      if (support == 'cash') {
        const newB = dbUser.moneyCash + toAdd;
        client.updateGuildUI(message.guild, user, {
          "users.$.moneyCash": newB
        });
      } else if (support == 'bank') {
        const newB = dbUser.moneyBank + toAdd;
        client.updateGuildUI(message.guild, user, {
          "users.$.moneyBank": newB
        });
      };
    }
  });
  const msg = language == 'fr' ? `${check_mark}${message.member} a ajouté $${toAdd} à la \`${support}\` balance de ${users.length} utilisateurs ayant le role <@&${role.id}> !` : `${check_mark}${message.member} added $${toAdd} to members's ${support} balance with the <@&${role.id}> role !`


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(language == 'fr' ? 'Monnaie ajouté' : 'Money Added')
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  message.channel.send(embed);
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADDMONEYROLE;