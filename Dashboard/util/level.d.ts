import { createCanvas } from "canvas";
import { Guild, GuildMember, Message, MessageAttachment, MessageEmbed, User } from 'discord.js';
import { User as DBUser } from "../../models"
/**
 * Up an user xp level
 * @param guild 
 * @param member 
 * @param userInfo 
 */
export declare function levelUp(guild: Guild, member: GuildMember, userInfo: any);
/**
 * Replace some text to other
 * @param {String} text
 * @example {user} to @user
 */
export declare function replaceLevelText(text: String, message: Message, options: Object);
/**
 * Replace text to image
 * @param text 
 * @param message 
 * @example {userAvatar} to <link_of_user_avatar>
 */
export declare function replaceLevelImage(text: String, message: Message): String;
/**
 * Same as replaceText but with embed object
 * @param {Object} embed 
 * @example {user} to @user
 */
export declare function replaceLevelEmbed(embed: MessageEmbed, message: Message, options: Object);

export declare function drawRankCard(user: User, userInfo: Promise<typeof DBUser>): MessageAttachment;