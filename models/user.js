const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    discordTag: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    guilds: {
        type: Array,
        required: true
    },
    brawlStars: {
        type: Object,
        default: {
            account1: '',
            account2: '',
            account3: ''
        }
    },
    clashRoyale: {
        type: Object,
        default: {
            account1: '',
            account2: '',
            account3: ''
        }
    },
    premium: {
        type: Object,
        default: {
            enable: false,
            startTimestamp: Date,
            duration: ''
        }
    }
});

module.exports = mongoose.model("User", userSchema);