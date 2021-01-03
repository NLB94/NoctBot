const { MESSAGES } = require("../../util/constants");
const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const settings = await client.getGuild(message.guild);
  if (settings.guildID == undefined) client.createGuild(message.guild);
  const canvas = createCanvas(1000, 300);
  const ctx = canvas.getContext("2d");

  const noir = await loadImage("./Assets/noir.png");
    const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.cache.get(args[0]))) : message.author;
    const member = message.guild.member(user);
    if (!member) return message.channel.send('User not found or not in this server!');
    const userInfo = await client.getUser(message.guild.member(member));
    if (user.bot) return message.channel.send("Bots can't receive experience!");
    if (!userInfo) return client.createUser(message.guild, member);
    else {
      let xp = userInfo.XP;
      let xpReq = userInfo.XPRequire;
      xp = xp >= 1000 ? `${Math.floor(xp / 1000)}K` : xp;
      xpReq = xpReq >= 1000 ? `${Math.floor(xpReq / 1000)}K` : xpReq;


        ctx.drawImage(noir, 0, 0, canvas.width, canvas.height);


        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "black";
        ctx.fillRect(20, 20, 925, 225);
        ctx.globalAlpha = 1;
        ctx.strokeRect(20, 20, 925, 225);

        ctx.strokeStyle = "#666666";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#666666";
        ctx.fillRect(0, 0, 20, 300);
        ctx.globalAlpha = 1;
        ctx.strokeRect(0, 0, 20, 300);

        ctx.strokeStyle = "#666666";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#666666";
        ctx.fillRect(0, 0, 1000, 20);
        ctx.globalAlpha = 1;
        ctx.strokeRect(0, 0, 1000, 20);

        ctx.strokeStyle = "#666666";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#666666";
        ctx.fillRect(980, 0, 20, 300);
        ctx.globalAlpha = 1;
        ctx.strokeRect(980, 0, 20, 300);

        ctx.strokeStyle = "#666666";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#666666";
        ctx.fillRect(0, 280, 1000, 20);
        ctx.globalAlpha = 1;
        ctx.strokeRect(0, 280, 1000, 20);

        ctx.fillStyle = "#666666";
        ctx.globalAlpha = 1;
        ctx.strokeRect(280, 190, 650, 50);

        ctx.fillStyle = "#66CCFF";
        ctx.globalAlpha = 0.8;
        ctx.fillRect(280, 190, (userInfo.XP / userInfo.XPRequire) * 650, 50)

        ctx.globalAlpha = 1;
        ctx.font = "30px Calibri";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(`${xp}`, 800, 175, 100);

        ctx.globalAlpha = 1;
        ctx.font = "30px Calibri";
        ctx.fillStyle = "#666666";
        ctx.fillText(`/ ${xpReq}  XP`, 865, 175, 100);

        ctx.globalAlpha = 1;
        ctx.font = "30px Calibri";
        ctx.fillStyle = "#66CCFF";
        ctx.fillText('LEVEL', 840, 100, 75);

        ctx.globalAlpha = 1;
        ctx.font = "75px Calibri";
        ctx.fillStyle = "#66CCFF";
        ctx.fillText(`${userInfo.level}`, 920, 105, 300);

        ctx.globalAlpha = 1;
        ctx.font = "50px Calibri";
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText(user.username, 280, 175, 300);

        ctx.globalAlpha = 1;
        ctx.font = "30px Calibri";
        ctx.fillStyle = "#666666";
        ctx.fillText(`#${user.discriminator}`, 450, 175, 300);

        const file = new MessageAttachment(canvas.toBuffer(), "rank.png");
        message.channel.send('\u200b', file)
  };
};



module.exports.help = MESSAGES.COMMANDS.LEVEL.RANK;