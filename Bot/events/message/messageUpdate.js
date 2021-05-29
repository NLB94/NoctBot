const {
    Client,
    Message,
    Collection
} = require("discord.js");
const func = require("../../../util/functions");
const ownerID = "616547009750499358";
const defaultPrefix = '~';

/**
 * 
 * @param {Client} client 
 * @param {Message} oldMessage 
 * @param {Message} newMessage 
 */
module.exports = async (client, oldMessage, newMessage) => {
    if (oldMessage.partial) {
        await oldMessage.fetch();
    };
    client.emit("message", (client, newMessage));
}