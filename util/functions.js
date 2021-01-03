const mongoose = require("mongoose");
const { Guild } = require("../models/main");
const message = require("../events/message/message");

module.exports = client => {
  client.createGuild = async guild => {
    if (!guild) return;
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild.save();
  };
  client.getGuild = async guild => {
    if (!guild) return;
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return client.config.DEFAULTSETTINGS;
  };
  client.getUser = async user => {
    if (!user) return;
    const data = await client.getGuild(user.guild);
    const position = data.users.map((e) => e.id).indexOf(user.id);
    return data.users[position];
  };
  client.updateGuild = async (guild, settings) => {
    if (!guild) return;
    let data = await client.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };
  client.createUser = async (guild, user) => {
    if (!guild || !user) return;
    const dailyCd = Date.now() - 8.64e+7;
    const daily = new Date(dailyCd);
    Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          users: {
            id: user.id,
            XP: 0,
            level: 0,
            XPRequire: 250,
            XPtoAddReq: 50,
            warns: 0,
            mutes: 0,
            afk: false,
            moneyBank: 0,
            moneyCash: 0,
            inventory: [],
            dailyCd: daily,
          },
        },
      }
    ).then();
  };
  client.updateUI = (guild, member, options = {}) => {
    Guild.updateOne({ guildID: guild.id, "users.id": member.id }, { $set: options }).then();
  };
  client.createMIOU = (guild, member, missingI = {}) => {
    Guild.updateOne({ guildID: guild.id, "users.id": member.id }, { $set: missingI }).then();
  };

  client.random = o => {
    var a = 10,
      b = 'abcdefghijklmnopqrstuvwxyz',
      c = '',
      d = 0,
      e = '' + b;
    if (o) {
      if (o.startsWithLowerCase) {
        c = b[Math.floor(Math.random() * b.length)];
        d = 1;
      }
      if (o.length) {
        a = o.length;
      }
      if (o.includeUpperCase) {
        e += b.toUpperCase();
      }
      if (o.includeNumbers) {
        e += '1234567890';
      }
    }
    for (; d < a; d++) {
      c += e[Math.floor(Math.random() * e.length)];
    }
    return c;
  };
  client.newCustomCommand = async (guild, name, description, onlyAdmin, code) => {
    if (!guild || !code || !name) return;
    const settings = await client.getGuild(guild);
    Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          customCommands: {
            name: name,
            description: description,
            onlyAdmin: onlyAdmin,
            code: code
          },
        },
        customCmdsNb: settings.customCmdsNb + 1
      }
    ).then();
  };
  client.lockChannel = async (guild, channel) => {
    if (!guild || !channel) return;
    Guild.updateOne(
      { guildID: guild.id },
      {
        $push: {
          lockChannels: {
            channelID: channel.id,
            channelName: channel.name,
            permissions: channel.permissionOverwrites
          },
        }
      }
    ).then();
  };
};