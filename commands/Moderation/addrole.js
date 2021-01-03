const { MESSAGES } = require("../../util/constants");

module.exports.run = (client, message, args) => {
    let role = args[0].startsWith('<@&') && args[0].endsWith('>') ? message.guild.roles.cache.get(message.mentions.roles.first().id) : message.guild.roles.cache.find(r => r.name.toLowerCase() === args.toString().toLowerCase());
    if (role) {
        if (message.member.roles.cache.has(role.id)) return message.channel.send("This user have already this role!");
        if (role.permissions.has('KICK_MEMBERS', true)) return message.channel.send("You can't add administrator role!");


        message.member.roles.add(role)
            .then(m => message.channel.send(`Successfully added ${role}!`))
            .catch(e => console.log(e));
    } else {
        message.channel.send("Role doesn't exists! Retry");
    }
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.ADDROLE;