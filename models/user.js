const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: String,
    brawlStars: {
        account1: '',
        account2: '',
        account3: ''
    },
    clashRoyale: {
        account1: '',
        account2: '',
        account3: ''
    },
    premium: {
        enable: false,
        startTimestamp: Date,
        duration: ''
    }
}); 

module.exports = mongoose.model("User", userSchema);