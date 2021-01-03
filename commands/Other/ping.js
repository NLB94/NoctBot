const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
  const msg = await message.channel.send("Pong!");
  msg.edit(`Pong - ${client.ws.ping}ms`);
};



module.exports.help = MESSAGES.COMMANDS.OTHER.PING;