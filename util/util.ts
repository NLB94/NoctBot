import {
  Channel,
  Client,
  Message,
  MessageEmbed,
  MessageType,
  Role,
  Snowflake,
} from "discord.js";

export declare class Giveaway {
  id: Snowflake;
  author: Snowflake;
  startedAt: Date;
  time: Number;
  winnerCount: Number;
  channel: Channel;
  price: String;
  status: String;
  blackListRoles: Role[];
  whiteListRoles: Role[];
}