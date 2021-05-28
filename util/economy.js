const mongoose = require('mongoose');
const { Guild } = require('../models');
const functions = require("./economy");
const func = require('./functions')

module.exports = func.client = client => {
    client.createItem = functions.createItem = async (guild, item) => {
        Guild.updateOne({
            guildID: guild.id
        }, {
            $push: {
                "economy.shop": item
            }
        }).then()
    }
};