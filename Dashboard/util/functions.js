const Discord = require('discord.js');
const {
  Guild,
} = require("../../models");
const functions = require('./functions');

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
    await Guild.updateOne({ guildID: guild.id }, {
      $push: {
        "moderation.case": options
      }
    }).then()
  }
};