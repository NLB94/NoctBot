const {
  MessageEmbed,
  ClientUser
} = require('discord.js');
const {
  readdirSync
} = require("fs");
const {
  MESSAGES
} = require("../../../util/constants");
const categoryList = readdirSync('./Bot/commands');


const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  
  const loadingEmoji = client.emojis.resolve(client.localEmojis.loadingEmoji);
  const emoji1 = client.emojis.resolve(client.localEmojis.emoji1);
  const emoji2 = client.emojis.resolve(client.localEmojis.emoji2);
  const emoji3 = client.emojis.resolve(client.localEmojis.emoji3);
  const emoji4 = client.emojis.resolve(client.localEmojis.emoji4);
  const emoji5 = client.emojis.resolve(client.localEmojis.emoji5);
  const emoji6 = client.emojis.resolve(client.localEmojis.emoji6);
  const emoji7 = client.emojis.resolve(client.localEmojis.emoji7);
  const emoji8 = client.emojis.resolve(client.localEmojis.emoji8);
  const emoji9 = client.emojis.resolve(client.localEmojis.emoji9)
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);
  const check_mark = client.emojis.resolve(client.localEmojis.checkMark)
  const right = client.emojis.resolve(client.localEmojis.arrowRight);

  if (!args.length) {
    if (message.guild && (message.guild.me.permissions.has(1074004032) || message.guild.me.permissions.has('ADMINISTRATOR'))) {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setTitle("Bot Commands")
        .setURL(`${client.botGuild.supportInvite}`)
        .setDescription(`Loading commands${loadingEmoji}`)
        .setTimestamp()
        .setFooter(message.guild == undefined ? '' : message.guild.name);
      const newEmbed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setTitle("Bot Commands")
        .setURL(`${client.botGuild.supportInvite}`)
        .setDescription(`My prefix in this server is ***\`${settings == undefined ? '~' : settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings == undefined ? '~' : settings.general.prefix}help <command | category>!`)
        .setTimestamp()
        .setFooter('React with ❌ to cancel command')



      newEmbed.addFields({
        name: `${emoji1} Server settings`,
        value: '\u200b'
      }, {
        name: `${emoji2} Moderation`,
        value: `\u200b`
      }, {
        name: `${emoji3} Level`,
        value: `\u200b`
      }, {
        name: `${emoji4} Info`,
        value: `\u200b`
      }, {
        name: `${emoji5} Economy`,
        value: `\u200b`
      }, {
        name: `${emoji6} Giveaway`,
        value: `\u200b`
      }, {
        name: `${emoji7} Other`,
        value: `\u200b`
      }, {
        name: `${emoji8} Count`,
        value: `\u200b`
      }, /*{
        name: `${emoji9} Other`,
        value: `\u200b`
      },*/ );

      return message.channel.send(embed).then(async msg => {
        await msg.react(emoji1).catch(() => {});
        await msg.react(emoji2).catch(() => {});
        await msg.react(emoji3).catch(() => {});
        await msg.react(emoji4).catch(() => {});
        await msg.react(emoji5).catch(() => {});
        await msg.react(emoji6).catch(() => {});
        await msg.react(emoji7).catch(() => {});
        await msg.react(emoji8).catch(() => {});
        await msg.react('❌').catch(() => {});
        await msg.edit(`${message.author.tag} React to get a category's commands!`, newEmbed).then(() => {}).catch(err => '');
      });
    } else {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setTitle("Bot Commands")
        .setURL(`${client.botGuild.supportInvite}`)
        .setDescription(`My prefix in this server is ***\`${settings == undefined ? '~' : settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings == undefined ? '~' : settings.general.prefix}help <command | category>!`)
        .setTimestamp();

      for (const category of categoryList) {
        if (category.toLowerCase() == 'admin') continue;
        embed.addField(`${right}${category}`, client.commands.filter(cat => cat.help.category == category.toLowerCase()).map(cmd => `${cmd.help.name}`).join(", "));
      }
      message.channel.send(embed)
    }
  } else if (isNaN(args[0])) {
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]))
    let cat = ''
    if (!command) cat = categoryList.find(c => c.toLowerCase() == args[0].toLowerCase())
    if (!command && !cat) return message.channel.send({
      embed: {
        description: `${x_mark}Nothing found!`
      }
    });
    if (cat) {
      if (cat.toLowerCase() == 'admin') return;
      else {
        const embed = new MessageEmbed()
          .setColor("#000000")
          .setTitle(cat)
          .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL());

        for (const command of readdirSync(`./Bot/commands/${cat}`)) {
          const cmd = client.commands.get(command.slice(0, parseInt(command.length) - 3).toLowerCase());
          if (cmd !== undefined) {
            embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `${right} ${cmd.help.name} ${cmd.help.usage} - ${cmd.help.description}`)
          }
        }
        message.channel.send(embed)
      }
    } else if (command) {
      if (command.help.category.toLowerCase() == 'admin') return;
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setTitle(`Name : \`${command.help.name}\``)
        .setDescription(`Enable : ${command.help.enable ? check_mark : x_mark}`)
        .addField("Description :", `${command.help.description} \n**Cooldown** : ${command.help.cooldown} second(s)`)
        .addField("Usage :", command.help.usage ? `${settings == undefined ? '~' : settings.general.prefix}${command.help.name} ${command.help.usage}` : `${settings == undefined ? '~' : settings.general.prefix}${command.help.name}`, true)
        .addField("Example :", command.help.example, false)

      if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, false);
      embed.addField("Only Server Owner :", command.help.onlyServerOwner ? `${check_mark}` : `${x_mark}`)
      if (command.help.permissions) embed.addField("Require permissions :", `${command.help.reqPermName || '\u200b'}`, true);
      if (command.help.botPerm) embed.addField("Bot require permissions :", `${command.help.botPermName || '\u200b'}`, true);
      if (command.help.onlyPremium) embed.setAuthor("Premium command");
      return message.channel.send(embed);
    }
  } else if (!isNaN(args[0])) {
    if (parseInt(args[0]) > 9 || parseInt(args[0] < 1)) return message.channel.send({
      embed: {
        description: `Correct usage : ${settings == undefined ? '~' : settings.general.prefix}help ${module.exports.help.usage}`
      }
    });
    else {
      const categorys = []
      for (const cat of categoryList) {
        categorys.push(cat)
      }
      const category = categorys[args[0]]
      if (category.toLowerCase() == 'admin') return message.channel.send({
        embed: {
          description: `Correct usage : ${settings == undefined ? '~' : settings.general.prefix}help ${module.exports.help.usage}`
        }
      });
      const embed = new MessageEmbed()
        .setTitle(category)
        .setAuthor(client.user.tag, client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setFooter(`Page ${args[0]} / 9`)
        .setTimestamp()
        .setDescription(client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => `${right}${cmd.help.name} - ${cmd.help.description}`).join('\n'));

      message.channel.send(embed);
    }
  }
};



module.exports.help = MESSAGES.COMMANDS.OTHER.HELP;