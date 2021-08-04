import { Message } from 'discord.js';
import { GuildUserData, GuildData } from "./functions";

export declare function checkDM(message: Message, args: String[]);
export declare function levelSystem(message: Message, data: GuildData, userInfo: GuildUserData);
export declare function notStartByPrefix(message: Message, data: GuildData, userInfo: GuildUserData);