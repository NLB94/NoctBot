import {
  Channel,
  Role,
  Snowflake,
  User,
} from "discord.js";

export declare class Giveaway {
  id: Snowflake;
  author: Snowflake;
  startedAt: Number;
  time: Number;
  endedAt: Number;
  winnerCount: Number;
  winners: User[];
  channel: Channel;
  price: String;
  status: String;
  blackListRoles: Role[];
  whiteListRoles: Role[];
}