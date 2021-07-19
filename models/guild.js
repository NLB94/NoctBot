const mongoose = require("mongoose");
const { guildModel } = require('../util/constants');
const guildSchema = mongoose.Schema(guildModel);

module.exports = mongoose.model("Guild", guildSchema);