const { MESSAGES } = require("../../../util/constants");
const { createCanvas, loadImage } = require("canvas");
const { Rank } = require('canvacord');
const { MessageAttachment } = require('discord.js');

const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo) => {
  if (settings == undefined) client.createGuild(message.guild);
  const x_mark = client.emojis.resolve('806440609127596032');

  const canvas = createCanvas(1000, 300); 
  const ctx = canvas.getContext("2d");

  const image = await loadImage("./Bot/Assets/rank.png");

  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
  if (user == undefined) return message.channel.send({embed: { description: `${x_mark}User not found !`}})
  if (user.bot) return message.channel.send("Bots can't receive experience!");

  const member = message.guild.member(user);
  if (!member) return message.channel.send({embed: { description: `${x_mark}User not in this server!`}});

  if (user !== message.author) userInfo = await client.getGuildUser(message.guild, member)
  if (userInfo == undefined) return client.createGuildUser(message.guild, user), message.channel.send('Please retry.');

  let statusColor = '';
  if (user.presence.status == 'online') statusColor = '#009966';
  if (user.presence.status == 'offline') statusColor = '#999999';
  if (user.presence.status == 'dnd') statusColor = '#CC3333';
  if (user.presence.status == 'idle') statusColor = '#FF9900';
  let xp = userInfo.XP;
  let xpReq = userInfo.XPRequire;
  xp = xp >= 1000 ? `${xp / 1000}K` : xp;
  xpReq = xpReq >= 1000 ? `${xpReq / 1000}K` : xpReq;
  if (xp.toString().split(".").length > 1) {
    const test1 = xp.toString().split(".");
    if (test1[1].length > 3) test1[1] = `${test1[1].slice(0, 2)}K`
    xp = test1.join(".")
  }
  if (xpReq.toString().split(".").length > 1) {
    const test2 = xpReq.toString().split(".");
    if (test2[1].length > 3) test2[1] = `${test2[1].slice(0, 2)}K`
    xpReq = test2.join(".")
  }
  const users = await client.getGuildUsers(message.guild);
  let userRank = users.sort((a, b) => (a.XP + (a.level * 99999999999999999999) < b.XP + (b.level * 99999999999999999999)) ? 1 : -1).map(e => e.id).indexOf(user.id)
  userRank += 1
//start ctx image
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.lineWidth = 2;
 //progress bar
  let width = (userInfo.XP / userInfo.XPRequire) * 657.5;
  if (width >= 657.5) width = 657.5;

  ctx.fillStyle = "#999999";
  ctx.arc(260 + 18.5, 160 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(260 + 18.5, 160 + 36.25, 675 - 18.5, 37.5);
  ctx.arc(260 + 675, 160 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();

  ctx.beginPath();
  
  ctx.fillStyle = settings.levelSystem.color;
  ctx.arc(260 + 18.5, 160 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(260 + 18.5, 160 + 36.25, width, 37.5);
  ctx.arc(260 + 18.5 + width, 160 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();

  ctx.save()
//xp 
  ctx.globalAlpha = 1;
  ctx.font = "30px Calibri";
  ctx.fillStyle = "#000000";
  ctx.fillText(`${xp} / ${xpReq} XP`, 500, 225, 200);
//rank & level
  ctx.globalAlpha = 1;
  ctx.font = "75px Calibri";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`#${userRank}`, 815, 100, 175);

  ctx.globalAlpha = 1;
  ctx.font = "75px Calibri";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${userInfo.level}`, 815, 175, 175);
//username & tag
  ctx.globalAlpha = 1;
  ctx.font = "50px Calibri";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(user.username, 280, 175, 300);

  ctx.globalAlpha = 1;
  ctx.font = "30px Calibri";
  ctx.fillStyle = "#999999";
  ctx.fillText(`#${user.discriminator.substr(0, 4)}`, (ctx.measureText(user.username).width / 300) + 580, 175, 300);

  //user avatar
  ctx.arc(135, 155, 100, 0, Math.PI * 2, true)
  ctx.lineWidth = 6
  ctx.strokeStyle = "#FFFFFF"
  ctx.closePath()
  ctx.clip();
  const avatar = await loadImage(user.displayAvatarURL({ format: "jpg" }))
  ctx.drawImage(avatar, 35, 55, 200, 200)
  ctx.restore();

  //user status
  ctx.beginPath();
  ctx.fillStyle = statusColor
  ctx.arc(200, 225, 25, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()

  const file = new MessageAttachment(canvas.toBuffer(), "rank.png");
  message.channel.send(`${user.tag} sent **${userInfo.messageSent} messages in this server.**`, file)
};



module.exports.help = MESSAGES.COMMANDS.LEVEL.RANK;