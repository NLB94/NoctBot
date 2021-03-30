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
          endedAt: giveaway.endedAt,
          time: ms(giveaway.time),
          remaining: ms(giveaway.time),
          winnerCount: giveaway.winnerCount,
          winners: giveaway.winners,
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
    const data = await Guild.findOne({
      guildID: guild.id
    });
    const position = await data.giveaways.map(e => e.id).indexOf(id);
    const giveawayInfo = await data.giveaways[position];
    return await giveawayInfo;
  };
  client.editGiveaway = functions.editGiveaway = async (guild, giveaway, options) => {
    Guild.updateOne({ 
      guildID: guild.id,
      "giveaways.id": giveaway.id 
     }, {
       $set: options
     }).then()
  }
  client.endGiveaway = functions.endGiveaway = async (guild, giveaway) => {
    const giveData = await client.getGiveaway(guild, giveaway.id);
    if (giveData.status !== 'en-cours') return;
    client.editGiveaway(guild, giveData, { "giveaways.$.status": 'fini', "giveaways.$.winners": giveaway.winners, "giveaways.$.endedAt": Date.now() })
  };
  client.restartGiveaway = functions.restartGiveaway = async (guild, giveaway) => {};
  client.deleteGiveaway = functions.deleteGiveaway = async (guild, ID) => {
    Guild.updateOne({
      guildID: guild.id
    }, {
      $pull: {
        giveaways: {
          id: ID
        }
      }
    }).then()
  }
};