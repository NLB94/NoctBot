const {
  MessageEmbed,
  ClientUser,
  MessageAttachment,
  MessageActionRow,
  MessageButton
} = require('discord.js');
const {
  readdirSync
} = require("fs");
const {
  createCanvas,
  loadImage
} = require("canvas")
let {
  MESSAGES, categorys
} = require("../../../util/constants");
const categoryList = readdirSync('./Bot/commands');
categorys = categorys.slice(0, 8);

const functions = require('../../../util/functions');
const { bgBlack } = require('chalk');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  const canvas = createCanvas(2000, 2000);
  const ctx = canvas.getContext("2d");
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
  const img = await loadImage('./Bot/Assets/blanc.png');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
  message.react(loadingEmoji).catch(err => {
    message.react("⏰").catch(err => message.channel.send('Please wait...'))
  });
  
  if (!args.length) {
    if (message.guild && (message.guild.me.permissions.has(1074004032) || message.guild.me.permissions.has('ADMINISTRATOR'))) {
      // const embed = new MessageEmbed()
      //   .setColor("#000000")
      //   .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
      //   .setTitle("Bot Commands")
      //   .setURL(`${client.botGuild.supportInvite}`)
      //   .setDescription(`Loading commands${loadingEmoji}`)
      //   .setTimestamp()
      //   .setFooter(message.guild == undefined ? '' : message.guild.name);
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setTitle("Bot Commands")
        .setURL(`${client.botGuild.supportInvite}`)
        .setDescription(await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)))
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL());
      // const newEmbed = new MessageEmbed()
      //   .setColor("#000000")
      //   .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
      //   .setTitle("Bot Commands")
      //   .setURL(`${client.botGuild.supportInvite}`)
      //   .setDescription(message.author.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)))
      //   .setTimestamp()
      //   .setFooter('React with 🗑️ to cancel command')
      let nextPos = 250;
      ctx.beginPath();
      // ctx.globalAlpha = 1;
      // ctx.font = "100px Calibri";
      // ctx.fillStyle = "#4169E1";
      // ctx.fillText(client.user.tag, 250, 1900, 1000);
      let catNb = 1;
      let pagesNb = 0;
      for (const category of categorys) {
        if (category.position > 8) continue;
        pagesNb++;
        let nextPosCmd = 250;
        ctx.font = "75px Calibri";
        ctx.fillStyle = "#999999";
        ctx.fillText(catNb + " - " + category.name, 250, nextPos, 500);
        nextPos+=50;
        catNb++
        const commands = await client.commands.filter(cmd => cmd.help.category == category.commandsCat).map(cmd => cmd.help);
        for (const command of commands) {
          ctx.font = "50px Calibri";
          ctx.fillStyle = "#000000";
          ctx.fillText(command.name, nextPosCmd, nextPos, 200);
          ((nextPosCmd + 200) > canvas.width) ? (nextPosCmd = 250, nextPos+=50) : nextPosCmd+=250
        }
        nextPos+=150
      };

      ctx.font = "50px Calibri";
      ctx.fillStyle = "#000000";
      ctx.fillText('Page 1/' + (parseInt((pagesNb / 8).toString().split(".")[0]) + 1), 1800, 1970, 500);

      ctx.arc(1000, 150, 100, 0, Math.PI * 2, true)
      ctx.lineWidth = 6
      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "#ffffff";
      ctx.closePath()
      ctx.clip();
      const avatar = await loadImage(client.user.displayAvatarURL({
        format: "jpg"
      }))
      ctx.drawImage(avatar, 900, 50, 200, 200)
      ctx.restore();

      // for (const category of categorys) {
      //   newEmbed.addField(`${await client.emojis.resolve(category.emoji)}${category.name}`, '\u200b')
      // }
      const row = new MessageActionRow()
			  .addComponents(
          new MessageButton()
					  .setCustomID('help-home')
					  .setStyle('SECONDARY')
            .setEmoji("🏠"),
          new MessageButton()
            .setCustomID('left-help')
            .setStyle('PRIMARY')
            .setEmoji("⬅️"),
          new MessageButton()
					  .setCustomID('right-help')
					  .setStyle('PRIMARY')
            .setEmoji("➡️"),
				  new MessageButton()
					  .setCustomID('delete')
					  .setStyle('DANGER')
            .setEmoji("🗑️"),
			);
      const file = new MessageAttachment(canvas.toBuffer(), "help.png");
      embed.attachFiles(file);
      
      message.channel.send({embed, components: [row]}).then(async msg => {
        await msg.react(emoji1).catch(() => {});
        await msg.react(emoji2).catch(() => {});
        await msg.react(emoji3).catch(() => {});
        await msg.react(emoji4).catch(() => {});
        await msg.react(emoji5).catch(() => {});
        await msg.react(emoji6).catch(() => {});
        msg.react(emoji7).catch(() => {});
        msg.react(emoji8).catch(() => {});
      });
    } else {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
        .setTitle("Bot Commands")
        .setURL(`${client.botGuild.supportInvite}`)
        .setDescription(strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix))
        .setTimestamp();

      for (const category of categoryList) {
        if (category.toLowerCase() == 'admin') continue;
        embed.addField(`\`\`\`${category}\`\`\``, client.commands.filter(cat => cat.help.category == category.toLowerCase()).map(cmd => `\`${cmd.help.name}\``).join(", "));
      }
      message.channel.send(embed)
    }
  } else {
    const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]))
    let cat = '';
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
          .setFooter(message.author.tag, message.author.displayAvatarURL());

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
        .addField("Example :", command.help.example ? command.help.example : strings.noExample, false)

      if (command.help.aliases.length > 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, false);
      embed.addField("Only Server Owner :", command.help.onlyServerOwner ? `${check_mark}` : `${x_mark}`)
      if (command.help.permissions) embed.addField("Require permissions :", `${command.help.reqPermName || '\u200b'}`, true);
      if (command.help.botPerm) embed.addField("Bot require permissions :", `${command.help.botPermName || '\u200b'}`, true);
      if (command.help.onlyPremium) embed.setAuthor("Premium command");
      return message.channel.send(embed);
    }
  };
};



module.exports.help = MESSAGES.COMMANDS.OTHER.HELP;