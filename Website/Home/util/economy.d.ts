import {
  Guild,
  MessageEmbed,
  Role,
  Message,
  MessageEmbedOptions,
} from "discord.js";
/**
 * Create an item in the guild's shop
 * @param guild
 * @param item
 */
export declare function createItem(guild: Guild, item: Item);
/**
 * Edit an existing item in the guild's shop
 * @param guild
 * @param item
 */
export declare function editItem(guild: Guild, item: Item);
/**
 * Remove an item from the guild's shop
 * @param guild
 * @param itemName
 */
export declare function deleteItem(guild: Guild, itemName: String);
export interface Item {
  public name: String;
  public price: Number;
  public id: Number;
  public description: String;
  public stock: Number;
  public timeInShop: Number;
  public requiredRole: String;
  public roleToGive: String;
  public roleToRemove: String;
  public replyMsg: String | MessageEmbedOptions;
}