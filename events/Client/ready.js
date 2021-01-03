const { Client } = require("discord.js");
const { set } = require("mongoose");

module.exports = client => {
  console.log(
    `${client.user.tag} est prêt alhamduliLlah ! ${client.guilds.cache.size} serveurs, ${client.users.cache.size} membres!`
  );

  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
      const data = await client.getGuild(g);
      if (data.guildID === undefined) client.createGuild({ guildID: g.id });
      else if (data.guilldID !== undefined) return;
  });

  let activities = ["~help or ping me", `${client.users.cache.size} members in ${client.guilds.cache.size} servers !`], i = 0;

  setInterval(
    () =>
      client.user.setPresence({
        activity: {
          name: `${activities[i++ % activities.length]}`,
          type: "LISTENING",
        },
      }),
    7000
  );
};
