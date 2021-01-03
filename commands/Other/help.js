const { MessageEmbed, ClientUser } = require("discord.js");
const { readdirSync } = require("fs");
const { MESSAGES } = require("../../util/constants");
const categoryList = readdirSync('./commands');
const category = ('../../commands.help.category');


module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
  const loadingEmoji = client.emojis.resolve('783028992231866419');
  const emoji1 = client.emojis.resolve('772418754583855134');
  const emoji2 = client.emojis.resolve('770976748082298891');
  const emoji3 = client.emojis.resolve('772419302133334046');
  const emoji4 = client.emojis.resolve('772418814594777099');
  const emoji5 = client.emojis.resolve('772419197673930782');
  const emoji6 = client.emojis.resolve('772419404855902209');
  const emoji7 = client.emojis.resolve('770976765219831811');
  const emoji8 = client.emojis.resolve('772418662929924106');
    if (!args.length) {
      const embed = new MessageEmbed()
      .setColor("#000000")
        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
        .setTitle("Bot Commands")
        .setURL('https://discord.gg/92ffufA')
        .setDescription(`Loading commands${loadingEmoji}`)
        .setTimestamp()
        .setFooter(message.guild.name);
        const newEmbed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("I2Z7", client.user.avatarURL(), 'https://discordapp.com/oauth2/authorize?client_id=735824367698837555&scope=bot&permissions=2146958847')
        .setTitle("Bot Commands")
        .setURL('https://discord.gg/92ffufA')
        .setDescription(`My prefix in this server is ***\`${settings.general.prefix}\`*** \nIf you need more informations about commands, type ${settings.general.prefix}help <command>!`)
        .setTimestamp()
        .setFooter('React with ❌ to cancel command')


        
        newEmbed.addFields(
          { name: `${emoji1} Server settings`, value: '\u200b'},
          { name: `${emoji2} Moderation`, value: `\u200b`},
          { name: `${emoji3} Level`, value: `\u200b`},
          { name: `${emoji4} Info`, value: `\u200b`},
          { name: `${emoji5} Economy`, value: `\u200b`},
          { name: `${emoji6} Giveaway`, value: `Soon...`},
          { name: `${emoji7} Other`, value: `\u200b`},
        );
        
       return message.channel.send(embed).then(async msg => {
        await msg.react('772418754583855134').catch(() => '');
        await msg.react('770976748082298891').catch(() => '');
        await msg.react('772419302133334046').catch(() => '');
        await msg.react('772418814594777099').catch(() => '');
        await msg.react('772419197673930782').catch(() => '');
        await msg.react('772419404855902209').catch(() => '');
        await msg.react('770976765219831811').catch(() => '');
        await msg.react('❌').catch(() => '');
         await msg.edit(["React to get category's commands!"], newEmbed).then(msg.delete({ timeout: 600000 })).catch(err => '');
       });
      }
       else {
          const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]))
          if (!command) return message.channel.send("Command not found!");
          const embed = new MessageEmbed()
        .setColor("#000000")
        .setTitle(`Name : \`${command.help.name}\``)
        .addField("Description :", `${command.help.description} \n**Cooldown** : ${command.help.cooldown} seconds`)
        .addField("Usage :", command.help.usage ? `${settings.general.prefix}${command.help.name} ${command.help.usage}` : `${settings.general.prefix}${command.help.name}`, true)

        if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);
        if (command.help.ownerCmd) embed.addField("Restrictions :", '`Bot Owner`');
        return message.channel.send(embed);
         };
         
      };
  
  
  
  module.exports.help = MESSAGES.COMMANDS.OTHER.HELP;