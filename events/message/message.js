const { Collection } = require("discord.js");
const { use } = require("passport");
const ownerID = "616547009750499358";

module.exports = async (client, message) => {
  if (!message.member || !message.author) return;

  if (message.channel.type === "dm") return client.emit("directMessage", (client, message));
  if (message.author.bot) return;

  const settings = await client.getGuild(message.guild);
  if (settings.guildID == undefined) await client.createGuild({ guildID: message.guild.id }).then();
  if (settings && settings.users == undefined) await client.createUser(message.guild, message.member);
  const position = await settings.users.map((e) => e.id).indexOf(message.author.id);
  const userInfo = await settings.users[position];

  
  if (message.guild && position === -1) await client.createUser(message.guild, message.member);

  if (!message.content.startsWith(settings.general.prefix) && userInfo !== undefined) {
   if (message.content.includes("<@!735824367698837555>") || message.content.includes("<@735824367698837555>") || message.content.startsWith("<@!735824367698837555>") || message.content.startsWith("<@735824367698837555>") || message.content.startsWith('~') && settings.general.prefix !== '~') await message.channel.send(`My prefix in this server is ***\`${settings.general.prefix}\`***`);
if(settings.levelSystem.levelEnable) {
    const expCd = Math.floor(Math.random() * 19) + 1;
    const expAdd = Math.floor(Math.random() * 25) + (10 * settings.levelSystem.levelBoost);

    if (expCd >= 8 && expCd <= 12) {
      const newXP = userInfo.XP + expAdd;
      await client.updateUI(message.guild, message.member, {
        "users.$.XP": newXP
      })
    };
    const oldLvl = Math.floor(userInfo.level);
    const xp = userInfo.XP;
    const xpreq = userInfo.XPRequire;
    const xpToAddReq = userInfo.XPtoAddReq;

    if (xp < xpreq) return;
    else if (xp >= xpreq) {
      const XPreqUp = xpreq + 250 + xpToAddReq;
      const newLvl = oldLvl + 1;
      const newAddReq = xpToAddReq + 50;
      const newXP = xp - xpreq;

      await client.updateUI(message.guild, message.member, { "users.$.XP": newXP });
      await client.updateUI(message.guild, message.member, { "users.$.XPRequire": XPreqUp });
      await client.updateUI(message.guild, message.member, { "users.$.level": newLvl });
      await client.updateUI(message.guild, message.member, { "users.$.XPtoAddReq": newAddReq });

      let msg = settings.levelSystem.levelMessage;
      if (msg == '') msg = 'GG {user}, you leveled up to {level}!';
        if (msg.includes("{user}" || "{member}")) msg = msg.replace("{user}" || "{member}", message.member)
        if (msg.includes("{level}")) msg = msg.replace("{level}", newLvl)
        if (msg.includes("{server}" || "{guild}")) msg = msg.replace("{server}" || "{guild}", message.guild)
        if (msg.includes("{userID}" || "{memberID}")) msg = msg.replace("{userID}" || "{memberID}", message.author.id)
        if (msg.includes("{serverID}" || "{guildID}")) msg = msg.replace("{serverID}" || "{guildID}", message.guild.id)
        if (msg.includes("{XP}")) msg = msg.replace("{XP}", newXP);
        if (msg.includes("{XPReq}")) msg = msg.replace("{XPReq}", XPreqUp);

        let channel = settings.levelSystem.levelChannel;
        if (channel == '') channel = message.channel;
        channel.send(`${msg}`);

        if (settings.levelSystem.DMUser) {
          let msgDm = settings.levelSystem.dmMessage
          if (msgDm == '') msgDm = msg;
          message.author.send(`${msgDm}`);
      }
    };
  };
  };
  if (message.content.startsWith(settings.general.prefix)) {
  const args = message.content.slice(settings.general.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command) return message.channel.send("Unknown Command !");

  if (!command.help.enable && message.author.id !== ownerID) return message.channel.send('This command is on devlopment. Please wait...');

  if(command.help.permissions && message.guild.id == ('568902211980099605' || '791224123438399488')) return message.channel.send('Can\'t use this command in this guild!');
  
  if (command.help.ownerCmd && message.author.id !== ownerID) return message.channel.send("This command require `Bot Owner` Permissions!");

  if (command.help.onlyPremium && !settings.general.premium) return message.channel.send("Only for premium server ! Upgrade to premium if you want more features !");

  if (command.help.onlyServerOwner && message.author.id !== message.guild.ownerID) return message.channel.send("This command require `Server Owner` Permissions!");

  if (command.help.permissions && !message.member.hasPermission(command.help.reqPermName)) return message.reply(`You don't have enough permissions to use \`${command.help.name}\` command! \nNeeded permissions : \`${command.help.reqPermName}\``);

  if (command.help.botPerm && !message.guild.member(client.user).hasPermission(command.help.botPermName)) return message.channel.send(`I don't have enough permissions to run this command ! Give me \`${command.help.botPermName}\` permission(s)`)

  if (command.help.args && !args.length) {
    let noArgsReply = `${message.author} Correct usage :`;

    if (command.help.usage)
      noArgsReply += `\`${settings.general.prefix}${command.help.name} ${command.help.usage}\``;
    if (command.help.name === "config")
      noArgsReply += `\nIf you want to show all available keys, type \`${settings.general.prefix}keys\``;

    return message.channel.send(noArgsReply);
  }
  
  if ((command.help.args && args.length || !command.help.args) && (command.help.permissions && message.member.hasPermission(command.help.reqPermName) || !command.help.permissions) && !command.help.ownerCmd) {
    if (!client.cooldowns.has(command.help.name)) {
      client.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = client.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 0) * 1000;

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;

        return message.reply(`You have to wait ${Math.round(timeLeft)} second(s) to retry \`${command.help.name}\` command!`);
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);
  }
  command.run(client, message, args, userInfo, settings);
};
};