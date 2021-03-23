const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, userInfo) => {
  const settings = await client.getGuild(message.guild);
  if (!args[0].startsWith("<@") && !args[0].endsWith(">") && isNaN(args[1]))
    return message.channel.send(
      `Correct usage : \`${settings.general.prefix}givemoney ${module.exports.help.usage}\``
    );
  const user = await client.getGuildUser(message.guild,
    message.guild.member(message.mentions.users.first())
  );
  if (message.mentions.users.first().bot)
    return message.channel.send("You can't give money to bots!");
  if (message.mentions.users.first().tag === message.author.tag)
    return message.channel.send("You can't give money to yourself!");
  if (!user || !userInfo) return;
  if (!args[1])
    return message.channel.send(
      `Correct usage : \`${settings.general.prefix}givemoney ${module.exports.help.usage}\``
    );
  if (args[1] !== "all" && !isNaN(args[1])) {
    try {
      const m = parseInt(args[1]);
      if (userInfo.moneyCash < m)
        return message.reply(
          `You don't have enough money to give! \nRequire : $${Math.floor(
            m - userInfo.moneyCash
          )}`
        );
      else if (user && userInfo.moneyCash >= m) {
        message.channel.send(
          `Do you want to pay $${m} to ${message.guild.member(
            message.mentions.users.first()
          )} ? (yes or cancel)`
        );
        const filter = (f) => message.author.id === f.author.id;
        const userE = await message.channel.awaitMessages(filter, {
          max: 1,
          time: 20000,
          errors: ["time"],
        });
        if (userE.first().content.toLowerCase() === "yes") {
          const newB = user.moneyCash + m;
          const givB = userInfo.moneyCash - m;

          client.updateGuildUI(message.guild, message.member,
            {
              "users.$.moneyCash": givB,
            });
          client.updateGuildUI(message.guild, user,
            {
              "users.$.moneyCash": newB,
            });

          message.reply(
            `You gave $${m} to ${message.guild.member(message.mentions.users.first())}`
          );
        } else if (
          userE.first().content.toLowerCase() === "cancel" ||
          userE.first().content.toLowerCase() === "no"
        )
          return message.channel.send("Command canceled!");
      }
    } catch (e) {
      message.channel.send("Command canceled!");
    }
  } else if (args[1] === "all") {
    try {
      const m = userInfo.moneyCash;
      message.channel.send(
        `Do you want to pay $${m} to <@${message.guild.member(message.mentions.users.first().id)}> ? (yes or cancel)`
      );
      const filter = (f) => message.author.id === f.author.id;
      const userE = await message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ["time"],
      });
      if (userE.first().content.toLowerCase() === "yes") {
        const newB = user.moneyCash + m;
          const givB = userInfo.moneyCash - m;

          client.updateGuildUI(message.guild, message.member,
            {
              "users.$.moneyCash": givB,
            });
          client.updateGuildUI(message.guild, user,
            {
              "users.$.moneyCash": newB,
            });
        message.reply(
          `You gave $${m} to <@${message.guild.member(message.mentions.users.first()).id}>`
        );
      } else if (
        userE.first().content.toLowerCase() === "cancel" ||
        userE.first().content.toLowerCase() === "no"
      )
        return message.channel.send("Command canceled!");
    } catch (e) {
      message.channel.send("Command canceled!");
      console.log(e);
    }
  }
};

module.exports.help = MESSAGES.COMMANDS.ECONOMY.GIVEMONEY;
