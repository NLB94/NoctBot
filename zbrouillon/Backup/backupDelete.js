const { MESSAGES } = require("../../util/constants");
const backup = require("backup");

module.exports.run = (client, message, args) => {
    message.delete();

  };
  
  
  
  module.exports.help = MESSAGES.COMMANDS.ADMIN.BACKUPDELETE;