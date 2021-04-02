const {
  MessageEmbed,
  ClientUser
} = require("discord.js");
const {
  readdirSync
} = require("fs");
const {
  MESSAGES
} = require("../../../util/constants");
const categoryList = readdirSync('./Bot/commands');


const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
;
  
  const loadingEmoji = client.emojis.resolve('783028992231866419');
  const emoji1 = client.emojis.resolve('772418754583855134');
  const emoji2 = client.emojis.resolve('770976748082298891');
  const emoji3 = client.emojis.resolve('772419302133334046');
  const emoji4 = client.emojis.resolve('772418814594777099');
  const emoji5 = client.emojis.resolve('772419197673930782');
  const emoji6 = client.emojis.resolve('772419404855902209');
  const emoji7 = client.emojis.resolve('770976765219831811');
  const emoji8 = client.emojis.resolve('772418662929924106');
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve('770980790242377739')
  const right = client.emojis.resolve('770976808899444776');

  if (!args.length) {
    if (message.guild && (message.guild.me.permissions.has(1074004032) || message.guild.me.permissions.has('ADMINISTRATOR'))) {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
        .setTitle("Bot Commands")
        .setURL('https://discord.gg/92ffufA')
        .setDescription(`Loading commands${loadingEmoji}`)
        .setTimestamp()
        .setFooter(message.guild == undefined ? '' : message.guild.name);
      const newEmbed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
        .setTitle("Bot Commands")
        .setURL('https://discord.gg/92ffufA')
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
      }, );

      return message.channel.send(embed).then(async msg => {
        await msg.react('772418754583855134').catch(() => '');
        await msg.react('770976748082298891').catch(() => '');
        await msg.react('772419302133334046').catch(() => '');
        await msg.react('772418814594777099').catch(() => '');
        await msg.react('772419197673930782').catch(() => '');
        await msg.react('772419404855902209').catch(() => '');
        await msg.react('770976765219831811').catch(() => '');
        await msg.react('❌').catch(() => '');
        await msg.edit(`${message.author.tag} React to get a category's commands!`, newEmbed).then(() => {}).catch(err => '');
      });
    } else {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
        .setTitle("Bot Commands")
        .setURL('https://discord.gg/92ffufA')
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
    if (parseInt(args[0]) > 7 || parseInt(args[0] < 1)) return message.channel.send({
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
        .setAuthor(client.user.tag, client.user.avatarURL(), 'https://discord.com/oauth2/authorize?client_id=735824367698837555&permissions=2146958847&response_type=code&scope=identify%20applications.commands%20bot%20guilds%20guilds.join')
        .setFooter(`Page ${args[0]} / 7`)
        .setTimestamp()
        .setDescription(client.commands.filter(cat => cat.help.category === category.toLowerCase()).map(cmd => `${right}${cmd.help.name} - ${cmd.help.description}`).join('\n'));

      message.channel.send(embed);
    }
  }
};



module.exports.help = MESSAGES.COMMANDS.OTHER.HELP;