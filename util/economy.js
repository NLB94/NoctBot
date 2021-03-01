const mongoose = require('mongoose');
const { Guild } = require('../models/main');
const functions = require("./economy");
const func = require('./functions')

module.exports = func.client = client => {
    client.createItem = functions.createItem = async (guild, item) => {
        Guild.updateOne({
            guildID: guild.id
        }, {
            $push: {
                "economy.shop": {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    requiredRole: item.requiredRole,
                    stock: item.stock,
                    timeInShop: item.timeInShop,
                    roleToGive: item.roleToGive,
                    roleToRem: item.roleToRemove,
                    typeMsg: item.typeMsg,
                    replyMsg: item.replyMsg
                }
            }
        }).then()
    }
};