const {
  Collection,
  Message,
  Channel,
} = require("discord.js");
const { getStrings } = require("../../../util/constants");
const func = require("../../../util/functions");
const ownerID = "616547009750499358";
const defaultPrefix = '~';
const {
  CountChannels
} = require('../../../util/functions')

/**
 * @param {func.Client} client 
 * @param {Message} message 
 */
module.exports = async (client, message) => {
  if (!message.author) return;

  let args = message.content.slice(defaultPrefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase().split("-").join("");

  if (message.channel.type == 'dm') {
    if (message.content.toLowerCase().startsWith("~help")) {
      return client.commands.get("help").run(client, message, args);
    } else return client.emit("dm", (client, message));
  }

  if (message.author.bot) return;
  const x_mark = client.emojis.resolve('806440609127596032');
  const check_mark = client.emojis.resolve('770980790242377739');
  const arrowRight = client.emojis.resolve('770976808899444776');

  const settings = await client.getGuild(message.guild);

  if (!settings || settings == undefined) await client.createGuild({
    guildID: message.guild.id
  })

  const position = await settings.users.map((e) => e.id).indexOf(message.author.id);
  const userInfo = await settings.users[position];

  if (message.guild && position === -1) await client.createGuildUser(message.guild, message.member);
  const strings = await getStrings(client, settings.general.language);

  if (message.content.includes("discord.gg") || message.content.includes("discord.com/invite")) await client.emit('automod', ({
    client,
    message,
    args,
    type: 'invite',
    settings,
    userInfo
  }));
  if (message.content.includes("https://") || message.content.includes("http://")) await client.emit('automod', ({
    client,
    message,
    args,
    type: 'link',
    settings,
    userInfo
  }));

  if (!message.content.startsWith(settings.general.prefix) && userInfo !== undefined) return client.notStartByPrefix(message, settings, userInfo);
  if (message.content.startsWith(settings.general.prefix)) {

    let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));

    let pos = settings.customCommands.map(e => e.help.name).indexOf(commandName),
      customCommand = settings.customCommands[pos];
    if (!command && customCommand) command = customCommand;
    if (!command) return;

    if (message.author.id !== ownerID) {
      const NoctCommu = await client.guilds.resolve('727494941911154688');
      if (command.help.ownerCmd) return;
      if (!command.help.enable && (!NoctCommu.members.resolve(message.author) || !NoctCommu.members.resolve(message.author).roles.cache.has('802959353921536021'))) return message.channel.send({
        embed: {
          description: `${x_mark}${strings.message.onDev}`
        }
      });

      if (command.help.onlyPremium && !settings.general.premium) return message.channel.send({
        embed: {
          description: `${x_mark}${strings.message.onlyPremium}`
        }
      });

      if (command.help.onlyServerOwner && message.author.id !== message.guild.ownerID) return message.channel.send({
        embed: {
          title: `${strings.message.missingPerms}`,
          description: `${x_mark} ${strings.message.onlyServerOwner}`
        }
      });
    }
    if (command.help.permissions && !message.member.permissions.has(command.help.reqPermName)) return message.reply({
      embed: {
        title: `${strings.message.missingPerms}`,
        description: `${x_mark} ${strings.message.permissions}`
      }
    });

    if (command.help.botPerm && !message.guild.me.permissions.has(command.help.botPermName)) return message.channel.send({
      embed: {
        title: `${strings.message.missingBotPerms}`,
        description: `${x_mark} ${strings.message.botPerm}`
      }
    })

    if (command.help.args && !args.length) {
      let noArgsReply = `${x_mark}${message.author} ${strings.usage}`;

      if (command.help.usage)
        noArgsReply += `\`${settings.general.prefix}${command.help.name} ${command.help.usage}\``;
      // if (command.help.name === `config` || command.help.name == 'level' || command.help.name == 'captcha' || command.help.name == 'ticket' || command.help.name == 'welcome' || command.help.name == 'leave')
      //   noArgsReply += `\nIf you want to show all available keys, type \`${settings.general.prefix}${command.help.name} keys\``;

      return message.channel.send({
        embed: {
          title: strings.message.missingArgs,
          description: noArgsReply
        }
      });
    }
    if (command.help.name == 'report' && args.join(` `).length < 25) return message.channel.send({
      embed: {
        title: strings.message.report.title,
        description: strings.message.report.description
      }
    })

    if ((command.help.args && args.length || !command.help.args) && (command.help.permissions && message.member.permissions.has(command.help.reqPermName) || !command.help.permissions) && !command.help.ownerCmd && (command.help.name == 'report' && args.join(` `).length >= 25 || command.help.name !== 'report')) {
      if (!client.cooldowns.has(command.help.name)) {
        client.cooldowns.set(command.help.name, new Collection());
      }

      const timeNow = Date.now();
      const tStamps = client.cooldowns.get(command.help.name);
      const cdAmount = (command.help.cooldown || 0) * 1000;
      const userCd = tStamps.get(command.help.name == 'report' ? `${message.author.id}` : `${message.author.id} ${message.guild.id}`)

      if (userCd) {
        const cdExpirationTime = userCd.time + cdAmount;

        if (timeNow < cdExpirationTime) {
          timeLeft = (cdExpirationTime - timeNow) / 1000;

          return message.reply({
            embed: {
              title: strings.message.cooldown.title,
              description: `${x_mark}${await strings.message.cooldown.description.replace("{time}", Math.round(timeLeft))}`
            }
          });
        }
      }
      tStamps.set(command.help.name == 'report' ? message.author.id  : message.author.id + ' ' + message.guild.id, {
        id: message.author.id,
        guildID: message.guild.id,
        time: timeNow
      });
      setTimeout(async () => {
        tStamps.delete(command.help.name == 'report' ? message.author.id  : `${message.author.id} ${message.guild.id}`)
      }, cdAmount);
    }
    command.run(client, message, args, settings, userInfo, strings);
  };
};