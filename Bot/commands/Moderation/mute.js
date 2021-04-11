const ms = require("ms")
const { MessageEmbed } = require('discord.js');
const { MESSAGES } = require("../../../util/constants");

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo)  => {

    
    const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

    const logs = settings.general.logs == 'logs' ? message.guild.channels.cache.find(c => c.name == 'logs') : message.guild.channels.cache.find(c => c.id == settings.general.logs);
    const user = args[0].startsWith('<@') && args[0].endsWith('>') ? message.guild.member(message.mentions.users.first()) : (isNaN(args[0]) ? (message.guild.members.cache.find(m => m.tag == args[0])) : message.guild.member(args[0]));
    if (!user) return message.channel.send({embed: {description: `${x_mark}Correct usage : \`${settings.general.prefix}mute ${module.exports.help.usage}\``}});
    let muteRole = settings.moderation.muteRole.toLowerCase() == 'muted' ? message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted') : message.guild.roles.cache.find(r => r.id === settings.moderation.muteRole);
    let muteTime = (args[1] || '24h');
    
    if (!muteRole) {
        muteRole = await message.guild.roles.create({
            data: {
                name: 'Muted',
                color: 'grey',
                permissions: []
            }
        });

     message.guild.channels.cache.forEach(async (channel, id) => {
         await channel.updateOverwrite(muteRole, {
             SEND_MESSAGES: false,
             ADD_REACTIONS: false,
             CONNECT: false
         });
     })
     const roleID = message.guild.roles.cache.find(r => r.name.toLowerCase() == 'muted').id;
         client.updateGuild(message.guild, {
             "moderation.muteRole": roleID
         })
    };
    if (user.hasPermission('BAN_MEMBERS', true)) return message.channel.send("I can't mute an admin!");
      if (message.guild.me.roles.highest.position <= user.roles.highest.position) return message.channel.send("I can't mute an user who have a role highest than mine!")
    if (user.roles.cache.has(muteRole.id)) return message.channel.send("This user is already mute!");
    if (!user.roles.cache.has(muteRole.id)) {
    await user.roles.add(muteRole.id);
    let reason = (args.splice(2).join(' ') || 'Unspecified');


    const embedMute = new MessageEmbed()
    .setAuthor(`${user.user.tag}`, user.user.avatarURL())
    .setColor("#000000")
    .setDescription(`Mute : <@${user.id}> \nModerator : ${message.author} \nReason : ${reason} \nTime : ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

    const embed = new MessageEmbed()
    .setAuthor(`${user.user.tag} has been muted`, user.user.avatarURL())
    .setColor("#000000")
    .setDescription(`Reason : ${reason} \nTime : ${ms(ms(muteTime))}`);

    message.channel.send(embed);
    if (logs !== undefined) { logs.send(embedMute);}
        user.user.send(`You have been muted in ${message.guild.name} by ${message.author.tag} with reason : ${reason} ! You will be unmute in ${muteTime} !`).catch(() => '')
   
   setTimeout(() => {
    if (user.roles.cache.has(muteRole.id)) {
        user.user.send(`You can now speak in ${message.guild.name}!`).catch(() => '');
    const embedUnmute = new MessageEmbed()
    .setAuthor(`${user.user.username}`, user.user.avatarURL())
    .setColor("#FFFF00")
    .setDescription(`Unmute : <@${user.id}> \nModerator : <@${process.env.CLIENT_ID}> \nReason : Time up`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());
       user.roles.remove(muteRole.id);
       if (logs !== undefined) {logs.send(embedUnmute)}
    }
   }, ms(muteTime));
}};
  
  module.exports.help = MESSAGES.COMMANDS.MODERATION.MUTE;