const func = require("./functions");
const functions = require('./user');
const mongoose = require('mongoose');
const {
    User
} = require('../models');
const Discord = require("discord.js");

module.exports = func.client = async (client) => {
    client.createUser = functions.createUser = async (userInfo) => {
        const dbUser = await User.findOne({ userID: userInfo.userID });
        if (dbUser) return dbUser;
        const merged = Object.assign({
            _id: mongoose.Types.ObjectId()
        }, userInfo);
        const createUser = await new User(merged);
        return (await createUser.save());
    };
    client.findAndUpdateUser = functions.findAndUpdateUser = async (userID, options) => {
        const user = await User.findOneAndUpdate({
            userID: userID
        }, options, {
            new: true
        });
        return user;
    };
    /**
     * 
     * @param {Discord.User} user 
     */
    client.getUser = async (user) => {
        const dbUser = await User.findOne({ userID: user.id });
        setTimeout(() => {console.log(dbUser)}, 2000)
        if (dbUser) return dbUser;
    }
    /**
     * 
     * @param {Discord.User} user 
     * @param {Object} options 
     */
    client.updateUser = async (user, options) => {
        const dbUser = await User.findOne({ userID: user.id });
        if (dbUser) {
            await User.updateOne({ userID: user.id }, options)
        } else return null;
    }
}