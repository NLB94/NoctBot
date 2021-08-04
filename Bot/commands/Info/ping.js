const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings)  => {

  const msg = await message.channel.send("Pong!");
  await msg.edit(`Pong - ${client.ws.ping}ms`);
};


module.exports.underCat = MESSAGES.COMMANDS.INFO.BOT;

module.exports.help = MESSAGES.COMMANDS.INFO.BOT.PING;