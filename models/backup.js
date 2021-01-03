const mongoose = require("mongoose");
const { DEFAULTSETTINGS: defaults } = require("../config");
const message = require("../events/message/message");

const backupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    backupID: String,
    guildName: String,
    roles: [],
    textChannels: [],
    voiceChannels: [],
    categorys: [],
});

module.exports = mongoose.model("Backup", backupSchema);