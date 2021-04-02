import { Client, Collection, Message } from "discord.js";
import { UserData, GuildData } from "./functions";

export declare function checkDM(message: Message, args: String[]);
export declare function levelSystem(message: Message, data: GuildData, userInfo: UserData);
export declare function notStartByPrefix(message: Message, data: GuildData, userInfo: UserData);