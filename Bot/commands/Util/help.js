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
  MESSAGES,
  categories
} = require("../../../util/constants");
const categoryList = readdirSync('./Bot/commands');
const cats = categories.slice(0, 25);

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  let canvas = createCanvas(2000, 2000);
  let ctx = canvas.getContext("2d");
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
  const img = await loadImage(`./Bot/Assets/${settings.general.apparence}.png`);
  const txtColor1 = settings.general.apparence == "light" ? "#000000" : "#ffffff";
  const txtColor2 =  settings.general.apparence == "light" ? "darkblue" : "darkblue";
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  /:invert color/ // var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // // invert colors
  // var i;
  // for (i = 0; i < imgData.data.length; i += 4) {
  //   imgData.data[i] = 255 - imgData.data[i];
  //   imgData.data[i + 1] = 255 - imgData.data[i + 1];
  //   imgData.data[i + 2] = 255 - imgData.data[i + 2];
  //   imgData.data[i + 3] = 255;
  // }
  // ctx.putImageData(imgData, 0, 0);
  // message.react(loadingEmoji).catch(err => {
  //   message.react("⏰").catch(err => message.channel.send('Please wait...'))
  // });

  if (!args.length) {
    // const embed = new MessageEmbed()
    //   .setColor("#000000")
    //   .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
    //   .setTitle(strings.help.bCommands)
    //   .setURL(`${client.botGuild.supportInvite}`)
    //   .setDescription(`Loading commands${loadingEmoji}`)
    //   .setTimestamp()
    //   .setFooter(message.guild == undefined ? '' : message.guild.name);
    const embed = new MessageEmbed()
      .setColor("#000000")
      .setAuthor("Noct", client.user.avatarURL(), `${client.botGuild.inviteLink}`)
      .setTitle(strings.help.bCommands)
      .setURL(`${client.botGuild.supportInvite}`)
      .setDescription(message.author.tag + ", " + await (strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix)))
      .setTimestamp()
      .setFooter('Page 1 • ' + message.author.tag, message.author.displayAvatarURL());

    embed.setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
    // canvas = await client.drawHelpHome(canvas, ctx, {
    //   page: 1, txtColor1, txtColor2
    // });

    for (const category of cats) {
      embed.addField(`${await client.emojis.resolve(category.emoji)} • ${category.name[settings.general.language]}`, `\`\`\`yaml\n${category.description[settings.general.language]}\`\`\``);
    };
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setDisabled(true)
          .setCustomId('NONE')
          .setStyle('SECONDARY')
          .setEmoji("🏠"),
        new MessageButton()
          .setDisabled(true)
          .setCustomId('NONE')
          .setStyle('SECONDARY')
          .setEmoji("⬅️"),
        new MessageButton()
          .setCustomId(((categories.length / 25) > 1) ? 'help-right-home1' : 'NONE')
          .setStyle(((categories.length / 25) > 1) ? 'PRIMARY' : 'SECONDARY')
          .setDisabled(((categories.length / 25) > 1) ? false : true)
          .setEmoji("➡️"),
        new MessageButton()
          .setCustomId('delete')
          .setStyle('DANGER')
          .setEmoji("🗑️"),
      );
    // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
    // embed.attachFiles(file);

    message.channel.send({
      embeds: [embed],
      components: [row]
    }).then(async msg => {
      for (const cat of cats) {
        msg.react(cat.emoji);
      }
    });
  } else {
    const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(args[0]))
    let cat = categories.find(c => c.name.en.toLowerCase() == args[0].toLowerCase());
    if (!command && (!cat || (cat && cat.name[settings.general.language].toLowerCase() == 'admin'))) return message.channel.send({
      embeds: [{
        description: `${x_mark}Nothing found !`
      }]
    });
    if (cat) {
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setTitle(strings.help.bCommands + "\n" + cat.name[settings.general.language])
        .setURL(client.botGuild.supportInvite)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setDescription(message.author.tag + ", " + strings.help.myPrfx.replaceAll("{prefix}", settings.general.prefix));
      embed.setDescription((embed.description ? embed.description + '\n\n' : '') + `${strings.help.sommaire}`)
      for (const underCat of cat.underCat) {
        const emj = client.emojis.resolve(underCat.emoji);
        const strs = underCat.description[settings.general.language];
        embed.addField(`${emj} • ${underCat.name[settings.general.language]}`, `\`\`\`yaml\n${strs}\`\`\``)
      }
      // canvas = await client.drawHelpCats(canvas, ctx, cat, {
      //   txtColor1, txtColor2
      // })
      let files = [];
      try {
        files = readdirSync(`./Bot/commands/${cat.name.en}`)
      } catch (e) {
        files = []
      }
      for (const command of files) {
        const cmd = client.commands.get(command.slice(0, parseInt(command.length) - 3).toLowerCase());
        if (cmd !== undefined && cmd.help.enable) {
          if (cmd.underCat) {
            const field = embed.fields.find(f => f.name.toString().toLowerCase().includes(cmd.underCat.emoji))
            if (field) field.value = field.value + '\n' + `\`${cmd.help.name}\` - ${cmd.help.description[settings.general.language]}`;
            else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[settings.general.language]}`)
          }
          else embed.setDescription((embed.description == null ? '' : `${embed.description} \n`) + `\`${cmd.help.name}\` - ${cmd.help.description[settings.general.language]}`)
        }
      }
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('help-home')
          .setStyle('SECONDARY')
          .setEmoji("🏠"),
          new MessageButton()
          .setCustomId('help-left')
          .setStyle('PRIMARY')
          .setEmoji("⬅️"),
          new MessageButton()
          .setCustomId('help-right')
          .setStyle('PRIMARY')
          .setEmoji("➡️"),
          new MessageButton()
          .setCustomId('delete')
          .setStyle('DANGER')
          .setEmoji("🗑️"),
        );
      // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
      // embed.attachFiles(file);

      message.channel.send({
        embeds: [embed],
        components: [row]
      }).then(async msg => {
        for (const cat of cats) {
          msg.react(cat.emoji)
        }
      });

    } else if (command) {
      if (command.help.category.toLowerCase() == 'admin') return;
      const embed = new MessageEmbed()
        .setColor("#000000")
        .setTitle(`${strings.help.bCommands} \n${command.help.name.replace(command.help.name[0], command.help.name[0].toUpperCase())}`)
        .addField("Example :", command.help.example ? command.help.example : strings.noExample, false)

      // ctx.beginPath();

      // let pos = {
      //   x: 250,
      //   y: 300
      // };
      // let catNb = 1;
      // for (const category of categories) {

      //   ctx.font = "75px Calibri";
      //   ctx.fillStyle = "#999999";
      //   if (category.name == command.help.categoryName) {
      //     ctx.fillText(catNb + " - " + category.name, 150, 150, 500);
      //   }
      //   catNb++
      // };

      // ctx.font = "60px Calibri";
      // ctx.fillStyle = "#666666";
      // ctx.fillText('Name :', 200, pos.y, 500);
      // pos.y += 75;

      // ctx.font = "50px Calibri";
      // ctx.fillStyle = txtColor1;
      // ctx.fillText(command.help.name.replace(command.help.name[0], command.help.name[0].toUpperCase()), pos.x, pos.y, 1000);
      // pos.y += 100;

      // ctx.font = "60px Calibri";
      // ctx.fillStyle = "#666666";
      // ctx.fillText('Enable :', 200, pos.y, 500);
      // pos.y += 75;

      // ctx.font = "50px Calibri";
      // ctx.fillStyle = txtColor1;
      // ctx.fillText(command.help.enable ? '🟢' : '🔴', pos.x, pos.y, 500);
      // pos.y += 100

      // ctx.font = "60px Calibri";
      // ctx.fillStyle = "#666666";
      // ctx.fillText('Description :', 200, pos.y, 500);
      // pos.y += 75;

      // ctx.font = "50px Calibri";
      // ctx.fillStyle = txtColor1;
      // ctx.fillText(command.help.description[settings.general.language], pos.x, pos.y, 1750);
      // pos.y += 100
      // if (command.help.cooldown > 1) {
      //   ctx.font = "60px Calibri";
      //   ctx.fillStyle = "#666666";
      //   ctx.fillText('Cooldown :', 200, pos.y, 500);
      //   pos.y += 75;

      //   ctx.font = "50px Calibri";
      //   ctx.fillStyle = txtColor1;
      //   ctx.fillText(command.help.cooldown + ' second(s)', pos.x, pos.y, 1750);
      //   pos.y += 100
      // }

      // if (command.help.aliases.length > 1) {
      //   ctx.font = "60px Calibri";
      //   ctx.fillStyle = "#666666";
      //   ctx.fillText('Alias :', 200, pos.y, 500);
      //   pos.y += 75;

      //   ctx.font = "50px Calibri";
      //   ctx.fillStyle = txtColor1;
      //   ctx.fillText(command.help.aliases.join(", "), pos.x, pos.y, 1750);
      //   pos.y += 100
      // }

      // if (command.help.usage) {
      //   ctx.font = "60px Calibri";
      //   ctx.fillStyle = "#666666";
      //   ctx.fillText('Usage :', 200, pos.y, 500);
      //   pos.y += 75;

      //   ctx.font = "50px Calibri";
      //   ctx.fillStyle = txtColor1;
      //   ctx.fillText(command.help.usage, pos.x, pos.y, 1750);
      //   pos.y += 100
      // }

      // ctx.font = "60px Calibri";
      // ctx.fillStyle = "#666666";
      // ctx.fillText('Only server owner :', 200, pos.y, 500);
      // pos.y += 75;

      // ctx.font = "50px Calibri";
      // ctx.fillStyle = txtColor1;
      // ctx.fillText(command.help.onlyServerOwner ? '🟢' : '🔴', pos.x, pos.y, 1750);
      // pos.y += 100

      // ctx.arc(1000, 150, 100, 0, Math.PI * 2, true)
      // ctx.lineWidth = 6
      // ctx.strokeStyle = "#ffffff";
      // ctx.fillStyle = "#ffffff";
      // ctx.closePath()
      // ctx.clip();
      // const avatar = await loadImage(client.user.displayAvatarURL({
      //   format: 'png'
      // }))
      // ctx.drawImage(avatar, 900, 50, 200, 200)
      // ctx.restore();

      // const file = new MessageAttachment(canvas.toBuffer(), "help.png");
      // embed.attachFiles(file);

      if (command.help.onlyPremium) embed.setAuthor("🌟 Premium command 🌟");
      return message.channel.send({embeds: [embed]});
    }
  };
};


module.exports.underCat = MESSAGES.COMMANDS.UTIL.HELP;

module.exports.help = MESSAGES.COMMANDS.UTIL.HELP;