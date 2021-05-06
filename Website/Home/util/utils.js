const { client } = require('../../../index');
const { getBotGuilds } = require('./api');
const functions = require('./util');
const { NextFunction } = require('express');
const { UserData } = require('../../../util/functions')

const getMutualGuilds = functions.getMutualGuilds = async (userGuilds) => {
  const botGuilds = await getBotGuilds();
  const mutualGuilds = [];
  for (let i = 0; i < botGuilds.length; i++) {
    const guild = userGuilds.map(g => g.id).indexOf(botGuilds[i].id)
    if (guild !== -1) {
      mutualGuilds.push(userGuilds[guild])
    }
  }
  return await mutualGuilds;
}
const getGuildIcon = functions.getGuildIcon = (guildID, hash) => `https://cdn.discordapp.com/icons/${guildID}/${hash}.png`;

const getAdminGuilds = functions.getAdminGuilds = (guilds) => {
  const userGuilds = [];
  guilds.forEach(g => {
    if ((g.permissions & 32) == 32) userGuilds.push(g);
  });
  return userGuilds;
};

const getNonMutualGuilds = functions.getNonMutualGuilds = async (userGuilds, mutualGuilds) => {
  const notMutualGuilds = [];
  userGuilds.forEach(g => {
    if (!mutualGuilds.includes(g)) notMutualGuilds.push(g);
  });
  return notMutualGuilds;
};

const sortGuilds = functions.sortGuilds = async (userGuilds, mutualGuilds) => {
  const mutsGuilds = [];
  for (let i = 0;i < mutualGuilds.length;i++) {
    let g = await client.guilds.resolve(mutualGuilds[i].id);
    if (!g) g = mutualGuilds[i];
    await mutsGuilds.push(g);
  }

  userGuilds = await userGuilds.sort((a, b) => (mutualGuilds.includes(a) && !mutualGuilds.includes(b) ? -1 : 1))
  return {mutualGuilds: await userGuilds.slice(0, mutsGuilds.length), userGuilds: await userGuilds.slice((mutsGuilds.length - 1), userGuilds.length)};
};
/**
 * 
 * @param {UserData[]} users 
 * @param {String} type 
 */
const sortUsers = async (users, type) => {
  if (type == 'level') {
    const toRet = await users.sort((a, b) => {
      const xp1 = (a.XP * (a.level * 99999999999999));
      const xp2 = (b.XP * (b.level * 99999999999999));
      ((xp1 < xp2) ? 1 : -1)
    });
  } else if (type == 'money') {
    const toRet = await users.sort((a, b) => ((a.moneyCash + a.moneyBank) < (b.moneyCash + b.moneyBank) ? 1 : -1));
    return toRet;
  }
}
/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next
 * @returns 
 */
const validateGuild = async (req, res, next) => {
  res.locals.guild = await client.guilds.resolve(req.params.id);
  return (res.locals.guild)
    ? next()
    : res.render('errors/404');
};

module.exports = {
  getMutualGuilds,
  getGuildIcon,
  getAdminGuilds,
  getNonMutualGuilds,
  sortGuilds,
  validateGuild,
  sortUsers
}