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
    noctCredits: {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("User", userSchema);