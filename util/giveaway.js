const ms = require('ms');
const {
  Guild,
} = require("../models/main");
const functions = require('./giveaway');
const func = require('./functions')

module.exports = func.client = client => {
  client.createGiveaway = functions.createGiveaway = async (guild, giveaway) => {
    Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        giveaways: {
          id: giveaway.id,
          author: giveaway.hostedBy,
          startedTime: giveaway.startedTime,
          time: ms(giveaway.time),
          winnerCount: giveaway.winnerCount,
          channel: giveaway.channel.id,
          price: giveaway.price,
          status: 'en-cours',
          blackListRoles: giveaway.blackListRoles,
          whiteListRoles: giveaway.whiteListRoles
        }
      }
    }).then()
  };
  client.getGiveaway = functions.getGiveaway = async (guild, id) => {
    const data = await Guild.findOne({ guildID: guild.id });
    const position = await data.giveaways.map(e => e.id).indexOf(id);
    const giveawayInfo = await data.giveaways[position];
    if (position == -1) return undefined;
    return giveawayInfo;
  };
  client.endGiveaway = functions.endGiveaway = async (guild, id) => {};
  client.restartGiveaway = functions.restartGiveaway = async (guild, giveaway) => {};
  client.deleteGiveaway = functions.deleteGiveaway = async (guild, ID) => {
    Guild.updateOne({
      guildID: guild.id
    }, {
      $pull: {
        giveaways: { id: ID }
      }
    }).then()
  }
};