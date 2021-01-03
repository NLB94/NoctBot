const { MESSAGES } = require("../../util/constants");

module.exports.run = async (client, message, args) => {
    const code = client.random({ length: 6, startsWithLowerCase: false, includeUpperCase: true, includeNumbers: true })
    
    const roles = [];
    message.guild.roles.cache.map(r => roles.push(r));
    const text = message.guild.channels.cache.filter(t => t.type.toLowerCase() == 'text');
    const voice = message.guild.channels.cache.filter(v => v.type.toLowerCase() == 'voice');
    const cat = message.guild.channels.cache.filter(c => c.type.toLowerCase() == 'cat');
    client.createBackup({ backupID: code }).then(() => setTimeout(() => {
        client.newBackup(code, message.guild, roles, text, voice, cat);
        console.log('Ca a marché alhamdulillah maintenant va faire salat!');
    }, 5000));
    
};



module.exports.help = MESSAGES.COMMANDS.BACKUP.BACKUP;