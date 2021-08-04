const mongoose = require("mongoose");

const backupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    backupID: String,
    guildInfo: {
        name: String,
        icon: String,
        banner: String,
        afk: {
            channel: {
                name: String,
                parentName: String
            },
            timeout: Number
        },
        verificationLvl: Number | String,
        region: String,
        explicitContentFilter: Number | String
    },
    authorID: String,
    roles: [],
    categories: [],
    others: {
        text: [],
        voice: []
    },
    emojis: []
    
});

module.exports = mongoose.model("Backup", backupSchema);