const func = require("./functions");
const functions = require('./user');
const mongoose = require('mongoose');
const {
    User
} = require("../../../models/main")

module.exports = func.client = async (client) => {
    client.createUser = functions.createUser = async (userInfo) => {
        const merged = Object.assign({
            _id: mongoose.Types.ObjectId()
        }, userInfo);
        const createUser = await new User(merged);
        return (await createUser.save());
    };
    client.findAndUpdateUser = functions.findAndUpdateUser = async (userID, options) => {
        const user = await User.findOneAndUpdate({
            userID: userID
        }, {
            discordTag: `${options.username}#${options.discriminator}`,
            email: options.email,
            avatar: options.avatar,
            guilds: options.guilds,
        }, {
            new: true
        });
        return user;
    }
}