const ms = require('ms');
const {
  Guild,
} = require("../models");
const func = require('./functions')

module.exports = func.client = client => {
  client.createGiveaway = async (guild, giveaway) => {
    const settings = await client.getGuild(guild);
    await Guild.updateOne({
      guildID: guild.id
    }, {
      $push: {
        giveaways: {
          id: giveaway.id,
          hostedBy: giveaway.hostedBy,
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
    }).then();

    const giveawayData = await client.getGiveaway(guild, giveaway.id)
    return await giveawayData;
  };
  client.getGiveaway = async (guild, id) => {
    const data = await Guild.findOne({
      guildID: guild.id
    });
    const position = await data.giveaways.map(e => e.id).indexOf(id);
    const giveawayInfo = await data.giveaways[position];
    return await giveawayInfo;
  };
  client.editGiveaway = async (guild, giveaway, options) => {
    Guild.updateOne({ 
      guildID: guild.id,
      "giveaways.id": giveaway.id 
     }, {
       $set: options
     }).then()
  }
  client.endGiveaway = async (guild, giveaway) => {
    const giveData = await client.getGiveaway(guild, giveaway.id);
    if (giveData.status !== 'en-cours') return;
    client.editGiveaway(guild, giveData, { "giveaways.$.status": 'fini', "giveaways.$.winners": giveaway.winners, "giveaways.$.endedAt": Date.now() })
  };
  client.restartGiveaway = async (guild, giveaway) => {};
  client.deleteGiveaway = async (guild, id) => {
    Guild.updateOne({
      guildID: guild.id
    }, {
      $pull: {
        giveaways: {
          id
        }
      }
    }).then()
  }
};