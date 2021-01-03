const { MESSAGES } = require("../../util/constants");
const backup = require("backup");

module.exports.run = (client, message, args) => {
    message.delete();

    let backupID = args[0];
    if(!backupID){
        return message.channel.send(":x: | You must specify a valid backup ID!");
    }
    backup.fetch(backupID).then(async () => {
        message.channel.send("When the backup is loaded, all the channels, roles, etc. will be replaced! Type `yes` to confirm!");
            await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "yes"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
                return message.channel.send("Command Canceled");
            });
            message.author.send(":white_check_mark: | Start loading the backup...");
            backup.load(backupID, message.guild).then(() => {
                backup.remove(backupID);
            }).catch((err) => {
                return message.author.send(":x: | Sorry, an error occurred... Please check that I have administrator permissions!");
            });
    }).catch(() => {
        return message.channel.send(":x: | No backup found for `"+backupID+"`!");
    });
    message.author.send(`Successfully loaded backup with the code ${backupID} \nNote: this backup was deleted after use`)
};

module.exports.help = MESSAGES.COMMANDS.BACKUP.BACKUPLOAD;

