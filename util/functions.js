const Discord = require('discord.js');
const moment = require('moment');
const {
  Guild,
  Votes,
} = require("../models");
const mongoose = require('mongoose');
const functions = require('./functions');
const {
  categorys
} = require('./constants');
const {
  loadImage
} = require('canvas');

module.exports = functions.client = client => {
  //random String
  client.randomString = functions.randomString = query => {
    var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = '' + b;
    if (query) {
      if (query.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (query.length) {
        a = query.length;
      }
      if (query.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (query.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  };
  //custom command
  client.newCustomCommand = functions.newCustomCommand = async (guild, options) => {
    if (!guild) return;
    const settings = await functions.getGuild(guild);
    Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        customCommands: {
          name: options.commandName,
          description: options.commandDescription,
          reply: options.commandResponse
        },
      },
    }).then();
  };
  //lock functions
  client.lockChannel = functions.lockChannel = async (guild, channel) => {
    if (!guild || !channel) return;
    channel.name = channel.name.replace('🔒_', '');
    Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        lockChannels: {
          channelID: channel.id,
          channelName: channel.name,
        },
      }
    }).then();
  };
  client.unlockChannel = functions.unlockChannel = (guild, channel) => {
    Guild.updateOne({
      guildID: guild.id,
    }, {
      $pull: {
        lockChannels: {
          channelID: channel.id
        }
      }
    }).then();
  };
  client.replaceText = functions.replaceText = async (text, message, options) => {

  }
  client.replaceEmbed = functions.replaceEmbed = async (embed, message, options) => {

  };

  client.translate = functions.translate = async (string, from, to) => {
    const traduction = await client.trad(string, {
      from: from,
      to: to
    }).then((res) => res.text).catch(err => {
      console.log(err);
    });
    return traduction;
  }
  client.createCount = functions.createCount = async (guild, channel, options) => {
    await Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        "countChannels.list": {
          id: channel.id,
          category: options.category,
          type: options.type
        }
      }
    }).then()
  };
  /**
   * 
   * @param {Discord.Guild} guild 
   * @param {functions.ModCase} options
   * @param {functions.GuildData} settings
   */
  client.createCase = async (guild, options, settings) => {
    await Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        "moderation.case": options
      }
    }).then()
  };
  /**
   * 
   * @param {functions.VoteData} vote 
   * @param {Number} timeS 
   */
  client.newVote = async (vote, timeS) => {
    let data = {
      user: vote.user,
      bot: vote.bot,
      type: vote.type,
      isWeekend: vote.isWeekend,
      time: timeS,
      day: await (moment(Date.now()).format("DD"))
    };
    let date = `${moment(Date.now()).format("MM/YYYY")}`
    const votes = await Votes.findOne({
      month: date
    });
    if (!votes) await client.changeVoteMonth();
    setTimeout(async () => {
      await Votes.updateOne({
        month: date
      }, {
        $push: {
          votes: data
        }
      })
    }, 3000);
  };
  client.changeVoteMonth = async () => {
    const dateNow = Date.now();
    let date = `${moment(dateNow).format("MM/YYYY")}`
    const merged = Object.assign({
      _id: mongoose.Types.ObjectId()
    }, {
      month: date
    });
    const changeVoteMonth = await new Votes(merged);
    changeVoteMonth.save();
  };
  client.drawHelpCats = functions.drawHelpCats = async (canvas, ctx, cat) => {
    ctx.beginPath();
    // ctx.globalAlpha = 1;
    // ctx.font = "100px Calibri";
    // ctx.fillStyle = "#4169E1";
    // ctx.fillText(client.user.tag, 250, 1900, 1000);
    let catPos = {
      x: 150,
      y: 150
    };
    let catNb = 1;
    // let pagesNb = 0;
    // let pageNb = 0;
    for (const category of categorys) {
      if (category.position > 8) continue;
      // pagesNb++;
      let nextPosCmd = {
        x: 250,
        y: 300
      };
      ctx.font = "75px Calibri";
      ctx.fillStyle = "#999999";
      category.name == cat.name ? ctx.fillText(catNb + " - " + category.name, catPos.x, catPos.y, 500) : '';
      catNb++;

      const commands = category.name == cat.name ? await client.commands.filter(cmd => cmd.help.category == category.commandsCat).map(cmd => cmd.help) : [];
      for (const command of commands) {
        ctx.font = "50px Calibri";
        ctx.fillStyle = "#000000";
        category.name == cat.name ? ctx.fillText(`${command.name} - ${command.description}`, nextPosCmd.x, nextPosCmd.y, 1750) : '';
        ((nextPosCmd + 200) > canvas.width) ? (nextPosCmd = 250) : nextPosCmd.y += 100
      }
    };

    // ctx.font = "50px Calibri";
    // ctx.fillStyle = "#000000";
    // ctx.fillText('1/' + (parseInt((pagesNb / 8).toString().split(".")[0]) + 1), 1800, 1970, 500);

    ctx.arc(1000, 150, 100, 0, Math.PI * 2, true)
    ctx.lineWidth = 6
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.closePath()
    ctx.clip();
    const avatar = await loadImage(client.user.displayAvatarURL({
      format: "png"
    }))
    ctx.drawImage(avatar, 900, 50, 200, 200)
    ctx.restore();

    return canvas;
  };
  client.drawHelpHome = functions.drawHelpHome = async (canvas, ctx, options) => {
    let nextPos = 250;
    ctx.beginPath();
    // ctx.globalAlpha = 1;
    // ctx.font = "100px Calibri";
    // ctx.fillStyle = "#4169E1";
    // ctx.fillText(client.user.tag, 250, 1900, 1000);
    let catNb = 1;
    let pagesNb = 0;
    for (const category of categorys) {
      pagesNb++;
      if (!(category.position > (options.page * 8) || category.position < ((8 * options.page) - 7))) {
        let nextPosCmd = 250;
        ctx.font = "75px Calibri";
        ctx.fillStyle = "#999999";
        ctx.fillText(catNb + " - " + category.name, 150, nextPos, 500);
        nextPos += 50;
        catNb++
        const commands = await client.commands.filter(cmd => cmd.help.category == category.commandsCat).map(cmd => cmd.help);
        for (const command of commands) {
          ctx.font = "50px Calibri";
          ctx.fillStyle = "#000000";
          ctx.fillText(command.name, nextPosCmd, nextPos, 200);
          ((nextPosCmd + 200) > canvas.width) ? (nextPosCmd = 250, nextPos += 50) : nextPosCmd += 250
        }
        nextPos += 150
      }
    };

    ctx.font = "50px Calibri";
    ctx.fillStyle = "#000000";
    ctx.fillText(options.page + '/' + (parseInt((pagesNb / 8).toString().split(".")[0]) + 1), 1800, 1970, 500);

    ctx.arc(1000, 150, 100, 0, Math.PI * 2, true)
    ctx.lineWidth = 6
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.closePath()
    ctx.clip();
    const avatar = await loadImage(client.user.displayAvatarURL({
      format: "png"
    }))
    ctx.drawImage(avatar, 900, 50, 200, 200)
    ctx.restore();
    return canvas;
  }
};