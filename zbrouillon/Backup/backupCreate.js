const backup = require("backup");
const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
    message.delete();
    backup.create(message.guild, {
    maxMessagesPerChannel: 10,
    jsonSave: false,
    jsonBeautify: false,
    doNotBackup: ["bans"],
    saveImages: "base64"
}).then((bck) => {
    message.channel.send('Creating backup...');
    setTimeout(() => {
        message.channel.send(`Successfully created backup with the id : ${bck.id} \nHere all infos about your backup : ${bck}`);
    }, 5000);
    
});
};

  
  
module.exports.help = MESSAGES.COMMANDS.BACKUP.BACKUPCREATE;
