const { MESSAGES } = require("../../../util/constants");
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args) => {
const settings = await client.getGuild(message.guild);
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.UPDATE;