const {
  MessageEmbed
} = require('discord.js');
const {
  MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark)
  if (!args[0].startsWith("<@") && !args[0].endsWith(">") && isNaN(args[1]))
    return message.channel.send(
      `Correct usage : \`${settings.general.prefix}givemoney ${module.exports.help.usage}\``
    );
  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;

  const dbUser = await client.getGuildUser(message.guild, message.guild.members.resolve(user));
  if (user.bot) return message.channel.send("You can't give money to bots!");
  if (user.tag === message.author.tag) return message.channel.send("You can't give money to yourself!");
  if (!dbUser || !userInfo) return;
  if (!args[1]) return message.channel.send(`Correct usage : \`${settings.general.prefix}givemoney ${module.exports.help.usage}\``);
  if (args[1] !== "all" && !isNaN(args[1])) {
    try {
      const m = parseInt(args[1]);
      if (userInfo.moneyCash < m) return message.reply(`You don't have enough money to give! \nRequire : $${Math.floor(m - userInfo.moneyCash)}`);
      else if (dbUser && userInfo.moneyCash >= m) {
        message.channel.send(`Do you want to pay $${m} to ${message.guild.members.resolve(user)} ? (yes or cancel)`);

        const filter = (f) => message.author.id === f.author.id;
        const userE = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ["time"],
        });

        if (userE.first().content.toLowerCase() === "yes") {
          const newB = dbUser.moneyCash + m;
          const givB = userInfo.moneyCash - m;

          client.updateGuildUI(message.guild, message.member, {
            "users.$.moneyCash": givB,
          });
          client.updateGuildUI(message.guild, dbUser, {
            "users.$.moneyCash": newB,
          });

          message.reply(`You gave $${m} to ${message.guild.members.resolve(user)}`);
        } else if (userE.first().content.toLowerCase() === "cancel" || userE.first().content.toLowerCase() === "no") return message.channel.send("Command canceled!");
      }
    } catch (e) {
      message.channel.send("Command canceled!");
    }
  } else if (args[1] == "all") {
    try {
      const m = userInfo.moneyCash;
      message.channel.send(
        `Do you want to pay $${m} to <@${message.guild.members.resolve(user.id)}> ? (yes or cancel)`
      );
      const filter = (f) => message.author.id === f.author.id;
      const userE = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ["time"],
      });
      if (userE.first().content.toLowerCase() === "yes") {
        const newB = dbUser.moneyCash + m;
        const givB = userInfo.moneyCash - m;

        client.updateGuildUI(message.guild, message.member, {
          "users.$.moneyCash": givB,
        });
        client.updateGuildUI(message.guild, dbUser, {
          "users.$.moneyCash": newB,
        });
        message.reply(`You gave $${m} to <@${message.guild.members.resolve(user).id}>`);
      } else if (userE.first().content.toLowerCase() === "cancel" || userE.first().content.toLowerCase() === "no") return message.channel.send("Command canceled!");
    } catch (e) {
      message.channel.send("Command canceled!");
      console.log(e);
    }
  }
};
module.exports.underCat = MESSAGES.COMMANDS.ECONOMY.MANAGE;

module.exports.help = MESSAGES.COMMANDS.ECONOMY.MANAGE.GIVEMONEY;
