const {
  MessageEmbed
} = require("discord.js");
const {
  MESSAGES
} = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
  const x_mark = client.emojis.resolve('806440609127596032');

  if (isNaN(args[0])) return message.channel.send({
    embed: {
      description: `${x_mark}Correct usage : \`${settings.general.prefix}unban <user_id>\``
    }
  });
  const logs = client.channels.cache.get('789919985307746304');
  const user = await client.users.fetch(args[0]).then(() => {
    if (user) {
      const embed = new MessageEmbed()
        .setAuthor(`${user.username}`, user.avatarURL)
        .setColor("#ef0f0f")
        .setDescription(`Unban : ${user} \nModerator : ${message.author}`)
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL());

      message.guild.members.unban(user)
        .then(() => {
          logs.send(embed);
        })
    }
  }).catch((err) => {
    message.channel.send("User not found!");
  });;


};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNBAN;