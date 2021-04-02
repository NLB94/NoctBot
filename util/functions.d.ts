import { Client, Guild, Message, TextChannel, VoiceChannel } from "discord.js";

/**
 * Return a random string for password or backup id
 * @param query
 * @returns {String}
 */
export declare function randomString(query: Object);
/**
 * Create a custom command for the guild
 * @param {Guild}
 * @param {Object}
 */
export declare function newCustomCommand(guild: Guild, options: Object);

/**
 * Function to update database when a channel is lock
 * @param {Guild} guild
 * @param {TextChannel} channel
 */
export declare function lockChannel(guild: Guild, channel: TextChannel);
/**
 * Function to update database when a channel is unlock
 * @param {Guild} guild
 * @param {TextChannel} channel
 */
export declare function unlockChannel(guild: Guild, channel: TextChannel);
/**
 * Replace some text to other
 * @param {String} text
 * @example {user} to @user
 */
export declare function replaceText(
  text: String,
  message: Message,
  options: Object
);
/**
 * Same as replaceText but with embed object
 * @param {Object} embed
 * @example {user} to @user
 */
export declare function replaceEmbed(
  embed: Object,
  message: Message,
  options: Object
);

export declare function run(
  client: Client,
  message: Message,
  args: String[],
  settings: GuildData
);

export declare function client(client: Client);
/**
 * Translate a string from a language to another language
 * @param string
 * @param from
 * @param to
 */
export declare function translate(string: String, from: String, to: String);
/**
 * Push a count channel settings in database
 * @param guild
 * @param channel
 */
export declare function createCount(
  guild: Guild,
  channel: VoiceChannel,
  options: Object
);

export declare class GuildData {
  constructor(any: any);
  public guildID: String;
  general: {
    language: String;
    prefix: String;
    logs: String;
    premium: Boolean;
  };
  moderation: {
    case: Array;
    muteRole: String;
    banMsg: String;
  };
  guildAuditLogs: {
    channelCreate: Boolean;
    channelDelete: Boolean;
    guildBanAdd: Boolean;
    guildBanRemove: Boolean;
    guildMuteAdd: Boolean;
    guildMuteRemove: Boolean;
    guildCreate: Boolean;
    guildDelete: Boolean;
    guildUpdate: Boolean;
    channelUpdate: Boolean;
    emojiCreate: Boolean;
    emojiDelete: Boolean;
    emojiUpdate: Boolean;
    guildMemberAdd: Boolean;
    guildMemberRemove: Boolean;
    guildMemberUpdate: Boolean;
    inviteCreate: Boolean;
    inviteDelete: Boolean;
    messageDelete: Boolean;
    messageUpdate: Boolean;
    roleCreate: Boolean;
    roleDelete: Boolean;
    roleUpdate: Boolean;
    userUpdate: Boolean;
    voiceStateUpdate: Boolean;
  };
  users: UserDataArray;
  automod: {
    whiteList: {
      bots: Boolean;
      admin: Boolean;
      whiteRoles: Array;
    };
    antiLink: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiInvite: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiUpperCase: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiEmojis: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiSpam: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiZalgo: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    antiMentions: {
      enable: Boolean;
      onlyWarn: Boolean;
      onlyDelete: Boolean;
      warnAndDelete: Boolean;
      logsThis: Boolean;
    };
    warnPunishment: {
      enable: Boolean;
      kick: Boolean;
      ban: Boolean;
      mute: Boolean;
      warnLimit: 0;
      logsThis: Boolean;
    };
    mutePunishment: {
      enable: Boolean;
      kick: Boolean;
      ban: Boolean;
      muteLimit: 0;
      logsThis: Boolean;
    };
  };
  levelSystem: {
    enable: Boolean;
    color: String;
    image: String;
    message: {
      embed: {
        enable: Boolean;
        data: {
          title: String;
          author: {
            name: String;
            iconURL: String;
            url: String;
          };
          url: String;
          description: String;
          timestamp: Boolean;
          footer: {
            name: String;
            iconURL: String;
          };
          color: String;
          thumbnail: String;
          image: String;
        };
      };
      normalMsg: {
        enable: Boolean;
        msg: String;
      };
    };
    channel: String;
    DM: {
      enable: Boolean;
      message: String;
    };
    boost: Number;
    role: {
      give: {
        enable: Boolean;
        role: String;
        level: Number;
      };
      rem: {
        enable: Boolean;
        role: String;
        level: Number;
      };
    };
  };
  economy: {
    money: String;
    workMsg1: String;
    workMsg2: String;
    workMsg3: String;
    robTrue: String;
    robFalse: String;
    shop: Array;
  };
  welcomeAndLeave: {
    welcome: {
      enable: Boolean;
      channel: String;
      role: String;
      isEmbed: Boolean;
      data: {
        title: String;
        author: {
          name: String;
          iconURL: String;
          url: String;
        };
        url: String;
        description: String;
        timestamp: Boolean;
        footer: {
          name: String;
          iconURL: String;
        };
        color: String;
        thumbnail: String;
        image: String;
      };
      normalMsg: {
        enable: Boolean;
        msg: String;
      };
      DMUser: {
        enable: Boolean;
        msg: String;
      };
    };
    leave: {
      enable: Boolean;
      channel: String;
      isEmbed: Boolean;
      embed: {
        data: {
          title: String;
          author: {
            name: String;
            iconURL: String;
            url: String;
          };
          url: String;
          description: String;
          timestamp: Boolean;
          footer: {
            name: String;
            iconURL: String;
          };
          color: String;
          thumbnail: String;
          image: String;
        };
      };
      isNormalMsg: Boolean;
      normalMsg: String;
      DMUser: {
        enable: Boolean;
        msg: String;
      };
    };
  };
  customCommands: Array;
  giveaways: Array;
  backups: {
    onlyServerOwner: Boolean;
    admins: Boolean;
    list: Array;
  };
  ticket: {
    enable: Boolean;
    category: String;
    title: String;
    description: String;
    msg: String;
    number: Number;
  };
  captcha: {
    enable: Boolean;
    channel: String;
    role: String;
    channel: String;
    logs: String;
  };
  lockChannels: Array;
  reactRoles: {
    enable: Boolean;
    list: Array;
  };
  countChannels: {
    enable: Boolean;
    category: String;
    list: Array;
  };
}

export interface UserData {
  id: String;
  XP: Number;
  level: Number;
  XPRequire: Number;
  XPtoAddReq: Number;
  messageSent: Number;
  voiceTime: Number;
  voiceXP: Number;
  voiceLvl: Number;
  voiceXPReq: Number;
  voiceXPAddReq: Number;
  warns: Number;
  mutes: Number;
  afk: {
    enable: false;
    message: String;
  };
  moneyBank: Number;
  moneyCash: Number;
  inventory: Array;
  cd: {
    daily: Date;
    hourly: Date;
    rob: Date;
  };
}
