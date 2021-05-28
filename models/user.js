const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    tag: {
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
    games: {
        brawlStars: [],
        clashRoyale: []
    },
    premium: {
        type: Object,
        default: {
            enable: false,
            startedTimestamp: Date,
            duration: ''
        }
    },
    lastVoteTS: {
        type: Number,
        default: 0
    },
    noctCredits: {
        type: Object,
        default: {
            total: 0,
            dateToday: 'JJ/MM/AA',
            daily: {
                cooldown: false,
                usedToday: 0,
                maxUsesPerDay: 10,
                limitIfNoVote: 5,
            },
            hourly: {
                cooldown: false,
                usedToday: 0,
                maxUsesPerDay: 20,
                limitIfNoVote: 10,
            },
        }
    },
});

module.exports = mongoose.model("User", userSchema);