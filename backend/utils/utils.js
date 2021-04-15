const functions = require('./utils')

const getMutualGuilds = functions.getMutualGuilds = async (userGuilds, botGuilds) => {
  const mutualGuilds = []
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
  userGuilds = userGuilds.sort((a, b) => (mutualGuilds.includes(a) && !mutualGuilds.includes(b) ? -1 : 1))
  return userGuilds
}

module.exports = {
  getMutualGuilds,
  getGuildIcon,
  getAdminGuilds,
  getNonMutualGuilds,
  sortGuilds
}