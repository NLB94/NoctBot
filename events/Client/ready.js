const chalk = require("chalk");

module.exports = client => {
  console.log(
    chalk.bgWhite.black(`${client.user.tag} est prêt alhamduliLlah ! ${client.guilds.cache.size} serveurs, ${client.users.cache.size} membres!`)
  );

  const guild = [];
  client.guilds.cache.map(e => guild.push(e));
  guild.forEach(async g => {
    const data = await client.getGuild(g);
    if (data === undefined) client.createGuild({
      guildID: g.id
    });
    g.members.fetch().then()
  });

  let activities = ["~help or ping me", `${client.users.cache.size} members in ${client.guilds.cache.size} servers !`],
    i = 0,
    presence = ['LISTENING', 'WATCHING'],
    j = 0;

  setInterval(
    () =>
    client.user.setPresence({
      activity: {
        name: `${activities[i++ % activities.length]}`,
        type: `${presence[j++ % presence.length]}`,
      },
    }),
    7000
  );
};
