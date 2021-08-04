const mongoose = require("mongoose");

const votesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    month: String,
    votes: []
});

module.exports = mongoose.model("Votes", votesSchema);