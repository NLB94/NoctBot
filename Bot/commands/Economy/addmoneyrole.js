const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require('../../../util/constants');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
  const check_mark = client.emojis.resolve(client.localEmojis.checkMark)

  const language = settings.general.language
  const support = args[0] == 'bank' || args[0] == 'cash' ? args[0].toLowerCase() : 'cash';
  const users = [];
  const role = args[0].startsWith('<@&') && args[0].endsWith('>') || args[1].startsWith('<@&') && args[1].endsWith('>') ? message.guild.roles.cache.find(r => r.id == message.mentions.roles.first().id) : (args[0] == 'bank' || args[0] == 'cash' ? (isNaN(args[1]) ? message.guild.roles.cache.find(r => r.name == args[1]) : message.guild.roles.cache.find(r => r.id == args[1])) : (isNaN(args[0]) ? message.guild.roles.cache.find(r => r.name == args[0]) : message.guild.roles.cache.find(r => r.id == args[0])));
  const correctUsage = `${x_mark}${strings.usage} : \`${settings.general.prefix}${module.exports.help.name} ${module.exports.help.usage}\``
  let nb = 0;
  if (!role) return message.channel.send({
    embeds: [{
      description: correctUsage
    }]
  });
  const toAdd = isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
  if (isNaN(toAdd)) return message.channel.send({
    embeds: [{
      description: correctUsage
    }]
  });
  message.guild.members.cache.map(m => users.push(m));
  users.forEach(async user => {
    if (!user.roles.cache.find(r => r.id == role)) return;
    else {
      nb++
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
  const msg = `${check_mark}${strings.economy.addmoneyrole.replace("{user}", message.author).replace("{toAdd}", toAdd).replace("{usersLength}", nb).replace("{roleID}", role.id)}`;


  const embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor('#000000')
    .setTitle(strings.economy.addmoneyrole.title)
    .setDescription(msg)
    .setFooter(message.guild, message.guild.iconURL())
    .setTimestamp();

  message.channel.send({
    embeds: [embed]
  });
};


module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.ADMIN;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADMIN.ADDMONEYROLE;