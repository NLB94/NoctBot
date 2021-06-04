import { Canvas, CanvasRenderingContext2D } from "canvas";
import {
  BaseClient,
  BaseGuildEmojiManager,
  ChannelManager,
  ClientApplication,
  ClientEvents,
  ClientOptions,
  ClientUser,
  ClientVoiceManager,
  Guild,
  GuildManager,
  GuildPreview,
  GuildResolvable,
  GuildTemplateResolvable,
  Invite,
  InviteGenerationOptions,
  InviteResolvable,
  Message,
  MessageEmbedOptions,
  PermissionResolvable,
  Permissions,
  Role,
  ShardClientUtil,
  Snowflake,
  TextChannel,
  User,
  UserManager,
  VoiceChannel,
  VoiceRegion,
  Webhook,
  WebSocketManager,
} from "discord.js";
import { Collection } from "mongoose";
import { Item } from "./economy";
import { Giveaway } from "./giveaway";

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
  settings: GuildData,
  userInfo: GuildUserData,
  strings: typeof import('../string.json').en
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
  options: CountChannels
);

export declare function drawHelpCats(canvas: Canvas, ctx: CanvasRenderingContext2D, category: Object);

export declare function drawHelpHome(canvas: Canvas, ctx: CanvasRenderingContext2D, options: Object);

export declare interface Cooldown {
  public id: String;
  public guildID: String;
  public time: Number;
}
export declare interface Command {
  run: Function;
  help: {
    name: String;
    aliases?: String[];
    category: String;
    categoryName: String;
    description: String;
    ownerCmd: Boolean;
    cooldown: Number;
    enable: Boolean;
    usage?: String;
    example?: String;
    botPerm: Boolean;
    botPermName: String;
    permissions: Boolean;
    onlyServerOwner: Boolean;
    reqPermName?: String;
    onlyPremium: Boolean;
    args: Boolean;
  }  
}
import * as botGuild from "../.bot.json";
import * as localEmojis from "../emojis.json";

export declare class Client extends BaseClient {
  constructor(options: ClientOptions);
  private actions: object;
  private _eval(script: string): any;
  private _validateOptions(options: ClientOptions): void;

  public application: ClientApplication | null;
  public channels: ChannelManager;
  public readonly emojis: BaseGuildEmojiManager;
  public guilds: GuildManager;
  public options: ClientOptions;
  public readyAt: Date | null;
  public readonly readyTimestamp: number | null;
  public shard: ShardClientUtil | null;
  public token: string | null;
  public readonly uptime: number | null;
  public user: ClientUser | null;
  public users: UserManager;
  public voice: ClientVoiceManager;
  public ws: WebSocketManager;
  public commands: Command[];
  public cooldowns: Cooldown[];
  public categories: String[];
  public botGuild: typeof botGuild;
  public localEmojis: typeof localEmojis;
  public brawlManager: import("@statscell/brawl").Client
  public topAPI: import("@top-gg/sdk").Api;
  public fr: typeof import("../string.json").fr
  public en: typeof import("../string.json").en
  public es: typeof import("../string.json").es
  public destroy(): void;
  public fetchGuildPreview(guild: GuildResolvable): Promise<GuildPreview>;
  public fetchInvite(invite: InviteResolvable): Promise<Invite>;
  public fetchGuildTemplate(template: GuildTemplateResolvable): Promise<GuildTemplate>;
  public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;
  public fetchWebhook(id: Snowflake, token?: string): Promise<Webhook>;
  public generateInvite(options?: InviteGenerationOptions): string;
  public login(token?: string): Promise<string>;
  public sweepMessages(lifetime?: number): number;
  public toJSON(): object;

  public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaited<void>): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaited<void>,
  ): this;

  public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaited<void>): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaited<void>,
  ): this;

  public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
  public emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: any[]): boolean;

  public off<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaited<void>): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaited<void>,
  ): this;

  public removeAllListeners<K extends keyof ClientEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>): this;
}

export declare class GuildData {
  constructor(any: any);
  public guildID: String;
  general: {
    language: "en" | "fr";
    prefix: String;
    logs: String;
    premium: Boolean;
  };
  moderation: {
    case: ModCase[];
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
  users: GuildUserData[];
  automod: {
    enable: Boolean;
    whiteList: {
      bots: Boolean;
      admin: Boolean;
      whiteRoles: Role[];
      permissions: PermissionResolvable[];
      channels: [];
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
      warnLimit: Number;
      logsThis: Boolean;
    };
    mutePunishment: {
      enable: Boolean;
      kick: Boolean;
      ban: Boolean;
      muteLimit: Number;
      logsThis: Boolean;
    };
  };
  levelSystem: {
    enable: Boolean;
    color: ColorResolvable;
    image: String;
    message: {
      type: "embed" | "normal";
      msg: String | MessageEmbedOptions;
    };
    channel: String;
    DM: {
      enable: Boolean;
      message: String;
    };
    boost: Number;
    role: [];
  };
  economy: {
    money: String;
    workMsg1: String;
    workMsg2: String;
    shop: Item[];
  };
  welcomeAndLeave: {
    welcome: {
      enable: Boolean;
      channel: String;
      role: String;
      type: "normal" | "embed";
      DMUser: {
        enable: Boolean;
        msg: String;
      };
      msg: String | MessageEmbedOptions;
    };
    leave: {
      enable: Boolean;
      channel: String;
      DMUser: {
        enable: Boolean;
        msg: String;
      };
      msg: String | MessageEmbedOptions;
      type: "normal" | "embed";
    };
  };
  customCommands: CustomCmds[];
  giveaways: Giveaway[];
  backups: {
    onlyServerOwner: Boolean;
    admins: Boolean;
    list: [];
  };
  ticket: {
    enable: Boolean;
    category: String;
    msg: String;
    embed: MessageEmbedOptions;
    list: TicketData[];
    number: Number;
  };
  captcha: {
    enable: Boolean;
    channel: String;
    role: String;
    minAge: String;
    logs: String;
  };
  lockChannels: LockChannels[];
  reactRoles: {
    enable: Boolean;
    list: ReactRoles[];
  };
  countChannels: {
    enable: Boolean;
    category: String;
    list: CountChannels[];
  };
}

export interface GuildUserData {
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
  inventory: [];
  cd: {
    daily: Number;
    hourly: Number;
    rob: Number;
  };
  invites: {
    total: Number;
    regular: Number;
    inviterID: String;
    regArray: [];
    all: [];
    leaves: [];
    fakes: [];
  };
}

export declare interface UserData {
  userID: String;
  tag: String;
  avatar: String;
  guilds: Array;
  games: {
    brawlStars: Array;
    clashRoyale: Array;
  };
  premium: {
    enable: Boolean;
    startedTimestamp: String;
    duration: String;
  };
  lastVoteTS: Number;
  noctCredits: {
    total: Number;
    dateToday: String;
    daily: {
      cooldown: Boolean;
      usedToday: Number;
      maxUsesPerDay: Number;
      limitIfNoVote: Number;
    };
    hourly: {
      cooldown: Boolean;
      usedToday: Number;
      maxUsesPerDay: Number;
      limitIfNoVote: Number;
    };
  };
}

export declare interface ModCase {
  userID: String;
  type: "Warn" | "Ban" | "Mute";
  id: Number;
  reason: String;
  moderatorID: String;
}

export interface RoleRewards {
  roleID: String;
  type: "give" | "remove";
  level: Number;
}

export interface TicketData {
  userID: String;
  channelID: String;
}

export interface ReactRoles {
  msgID: String;
  reactionID: String;
  roleID: String;
}

export interface CountChannels {
  category: CategoryCount;
  type: String;
  id: String;
}

export interface LockChannels {
  channelID: String;
  channelName: String;
}

export class CustomCmds {
  constructor(data?: CustomCmds);
  public name: String;
  public cooldown: Number;
  private args: Boolean;
  public usage: String;
  private msgType: "embed" | "normal";
  public msg: String | MessageEmbedOptions;
}

type CategoryCount = "channels" | "members" | "boosts";
export type ColorResolvable =
  | "DEFAULT"
  | "WHITE"
  | "AQUA"
  | "GREEN"
  | "BLUE"
  | "YELLOW"
  | "PURPLE"
  | "LUMINOUS_VIVID_PINK"
  | "GOLD"
  | "ORANGE"
  | "RED"
  | "GREY"
  | "DARKER_GREY"
  | "NAVY"
  | "DARK_AQUA"
  | "DARK_GREEN"
  | "DARK_BLUE"
  | "DARK_PURPLE"
  | "DARK_VIVID_PINK"
  | "DARK_GOLD"
  | "DARK_ORANGE"
  | "DARK_RED"
  | "DARK_GREY"
  | "LIGHT_GREY"
  | "DARK_NAVY"
  | "BLURPLE"
  | "GREYPLE"
  | "DARK_BUT_NOT_BLACK"
  | "NOT_QUITE_BLACK"
  | "RANDOM"
  | [number, number, number]
  | number
  | string;

export declare type PermissionResolvable =
  | "CREATE_INSTANT_INVITE"
  | "KICK_MEMBERS"
  | "BAN_MEMBERS"
  | "ADMINISTRATOR"
  | "MANAGE_CHANNELS"
  | "MANAGE_GUILD"
  | "ADD_REACTIONS"
  | "VIEW_AUDIT_LOG"
  | "PRIORITY_SPEAKER"
  | "STREAM"
  | "VIEW_CHANNEL"
  | "SEND_MESSAGES"
  | "SEND_TTS_MESSAGES"
  | "MANAGE_MESSAGES"
  | "EMBED_LINKS"
  | "ATTACH_FILES"
  | "READ_MESSAGE_HISTORY"
  | "MENTION_EVERYONE"
  | "USE_EXTERNAL_EMOJIS"
  | "VIEW_GUILD_INSIGHTS"
  | "CONNECT"
  | "SPEAK"
  | "MUTE_MEMBERS"
  | "DEAFEN_MEMBERS"
  | "MOVE_MEMBERS"
  | "USE_VAD"
  | "CHANGE_NICKNAME"
  | "MANAGE_NICKNAMES"
  | "MANAGE_ROLES"
  | "MANAGE_WEBHOOKS"
  | "MANAGE_EMOJIS";

export declare interface VoteData {
  public bot: string;
  public user: string;
  private type: "upvote" | "test";
  public isWeekend: boolean;
  readonly query: string;
}

export declare interface Votes {
  private month: String;
  public votes: VoteData[];
};