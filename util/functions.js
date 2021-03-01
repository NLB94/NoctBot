const {
  Guild,
} = require("../models/main");
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

  }
};