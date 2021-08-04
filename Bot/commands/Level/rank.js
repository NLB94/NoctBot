const { MESSAGES } = require("../../../util/constants");
const { createCanvas, loadImage } = require("canvas");
const { Rank } = require('canvacord');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings, userInfo, strings) => {
  if (settings == undefined) client.createGuild(message.guild);
  const x_mark = client.emojis.resolve(client.localEmojis.x_mark);

  const canvas = createCanvas(1000, 750); 
  const ctx = canvas.getContext("2d");

  const image = await loadImage(`./Bot/Assets/noir.png`);

  const user = args[0] ? (args[0].startsWith('<@') && args[0].endsWith('>') ? message.mentions.users.first() : (isNaN(args[0]) ? (args[0].includes('#') ? client.users.cache.find(m => m.tag.toLowerCase() == args[0].toLowerCase()) : (client.users.cache.find(m => (m.username.toLowerCase()) == args[0].toLowerCase()))) : client.users.resolve(args[0]))) : message.author;
  if (user == undefined) return message.channel.send({embeds: [{ description: `${x_mark}User not found !`}]})
  if (user.bot) return message.channel.send("Bots can't receive experience!");

  const member = message.guild.members.resolve(user);
  if (!member) return message.channel.send({embeds: [{ description: `${x_mark}User not in this server!`}]});

  if (user !== message.author && user !== message.member) userInfo = await client.getGuildUser(message.guild, member)
  if (userInfo == undefined) await client.createGuildUser(message.guild, user);

  let statusColor = '#469A60';
  if (user.presence.status == 'online') statusColor = '#469A60';
  if (user.presence.status == 'offline') statusColor = '#777F8B';
  if (user.presence.status == 'dnd') statusColor = '#DC5355';
  if (user.presence.status == 'idle') statusColor = '#E4A230';
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
  const sortedUsersLevel = await users.sort((a, b) => a.level < b.level ? 1 : -1);
  let userRank = await sortedUsersLevel.sort((a, b) => a.XP < b.XP ? 1 : -1).map(u => u.id).indexOf(user.id);

  userRank += 1
//start ctx image
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const w1 = canvas.width / 20;
  const w2 = canvas.width - w1;
  const h1 = canvas.height - (canvas.height / 20)
  console.log(w1, w2, h1)
  ctx.beginPath();
  //bordure
  ctx.strokeStyle = "#333333";
  ctx.lineWidth = 50;
  ctx.strokeRect(w1 / 2, w1 / 2, w2, h1)

 /*text level
 */
  
 //progress bar
  ctx.lineWidth = 2;
  let width = (userInfo.XP / userInfo.XPRequire) * 657.5;
  if (width >= 657.5) width = 657.5;

  let x1 = 100 + 18.5;
  let y1 = 350 + 36.25;
  ctx.fillStyle = "#999999";
  ctx.arc(x1, y1 + 18.5, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(x1, y1, 675 - 18.5, 37.5);
  ctx.arc(100 + 675, y1 + 18.5, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();

  ctx.beginPath();
  ctx.fillStyle = settings.levelSystem.color;
  ctx.arc(x1, y1 + 18.5, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
  ctx.fill();
  ctx.fillRect(x1, y1, width, 37.5);
  ctx.arc(x1 + width, y1 + 18.5, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
  ctx.fill();

  ctx.save()
//xp 
  ctx.globalAlpha = 1;
  ctx.font = "30px Calibri";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(`${xp} / ${xpReq} XP`, x1 + 450, 375, 200);
//rank & level
  // ctx.globalAlpha = 1;
  // ctx.font = "75px Calibri";
  // ctx.fillStyle = "#FFFFFF";
  // ctx.fillText(`#${userRank}`, 815, 100, 175);

  // ctx.globalAlpha = 1;
  // ctx.font = "75px Calibri";
  // ctx.fillStyle = "#FFFFFF";
  // ctx.fillText(`${userInfo.level}`, 815, 175, 175);
//username & tag
  ctx.globalAlpha = 1;
  ctx.font = "50px Calibri";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(user.username, 300, 175, 300);

  ctx.globalAlpha = 1;
  ctx.font = "30px Calibri";
  ctx.fillStyle = "#999999";
  ctx.fillText(`#${user.discriminator.substr(0, 4)}`, (ctx.measureText(user.username).width / 300) + 600, 175, 300);

  //user avatar
  ctx.arc(135, 155, 100, 0, Math.PI * 2, true)
  ctx.lineWidth = 6
  // ctx.strokeStyle = "#FFFFFF"
  ctx.closePath()
  ctx.clip();
  const avatar = await loadImage(user.displayAvatarURL({ format: "png" }))
  ctx.drawImage(avatar, 35, 55, 200, 200)
  ctx.restore();

  //user status
  ctx.beginPath();
  ctx.fillStyle = statusColor
  ctx.arc(200, 225, 25, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  
  const file = new MessageAttachment(canvas.toBuffer(), "rank.png");
  const img = canvas.toDataURL()
  const embed = new MessageEmbed()
    .setDescription("test")
    .setImage(img)
  message.channel.send({
    content: `${user.tag} sent **${userInfo.messageSent} messages in this server.**`,
    embeds: [embed]
    // files: [file]
  })
};


module.exports.underCat = MESSAGES.COMMANDS.LEVEL.INFO;

module.exports.help = MESSAGES.COMMANDS.LEVEL.INFO.RANK;