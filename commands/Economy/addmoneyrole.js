const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require('../../util/constants');

module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
    {
      const support = args[0] == 'bank' || args[0] == 'cash' ? args[0].toLowerCase() : 'cash';
      const users = [];
      const role = args[0].startsWith('<@&') && args[0].endsWith('>') || args[1].startsWith('<@&') && args[1].endsWith('>') ? message.guild.roles.cache.find(r => r.id == message.mentions.roles.first().id) : (args[0] == 'bank' || args[0] == 'cash' ? (isNaN(args[1]) ? message.guild.roles.cache.find(r => r.name == args[1]) : message.guild.roles.cache.find(r => r.id == args[1])) : (isNaN(args[0]) ? message.guild.roles.cache.find(r => r.name == args[0]) : message.guild.roles.cache.find(r => r.id == args[0])));
      if (!role) return message.channel.send(`Correct usage : \`${settings.general.prefix}addmoney-role [cash | bank] @role (amount)\``);
      const toAdd = isNaN(args[1]) ? parseInt(args[2]) : parseInt(args[1]);
      if (isNaN(toAdd)) return message.channel.send(`Correct usage : \`${settings.general.prefix}addmoney-role [cash | bank] @role (amount)\``)
      message.guild.members.cache.map(m => users.push(m));
      users.forEach(async user => {
        if (!user.roles.cache.find(r => r.id == role)) return;
        else {
          const dbUser = await client.getUser(user);
          if (!dbUser) return await client.createUser(message.guild, user);


            if (support == 'cash') {
              const newB = dbUser.moneyCash + toAdd;
              client.updateUI(message.guild, user, {
                "users.$.moneyCash": newB
              });
            }
            else if (support == 'bank') {
              const newB = dbUser.moneyBank + toAdd;
              client.updateUI(message.guild, user, {
                "users.$.moneyBank": newB
              });
            };
        }
      });
      const msg = `${message.member} added $${toAdd} to members's ${support} balance with the <@&${role.id}> role !`;


      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setColor('#000000')
        .setTitle('Money Added')
        .setDescription(msg)
        .setFooter(message.guild, message.guild.iconURL())
        .setTimestamp();

      message.channel.send(embed);
    }
  //return message.channel.send(`Correct usage : \`${settings.general.prefix}addmoney-role [cash | bank] @role (amount)\``)
};



module.exports.help = MESSAGES.COMMANDS.ECONOMY.ADDMONEYROLE;