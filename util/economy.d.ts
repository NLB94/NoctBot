import {
    Guild, MessageEmbed, Role, Message, MessageType
  } from "discord.js";
  /**
   * Create an item in the guild's shop
   * @param guild 
   * @param item 
   */
  export declare function createItem(guild: Guild, item: Item)
  /**
   * Edit an existing item in the guild's shop
   * @param guild 
   * @param item 
   */
  export declare function editItem(guild: Guild, item: Item)
  /**
   * Remove an item from the guild's shop
   * @param guild 
   * @param itemName 
   */
  export declare function deleteItem(guild: Guild, itemName: String)
  export class Item {
    constructor(options?: any); 
    public setName(name: String): this;
    public setPrice(price: Number): this;
    public setDescription(description: String): this;
    public setStock(stock: Number): this;
    public setTime(time: Number): this;
    public setRequiredRole(role: Role): this;
    public setRoleToGive(role: Role): this;
    public setRoleToRem(role: Role): this;
    public setMessage(
      MessageType: MessageEmbed | Message,
      Message: MessageEmbed | String
    ): this;
    public name: String;
    public price: Number;
    public description: String;
    public stock: Number;
    public timeInShop: Number;
    public requiredRole: Role;
    public roleToGive: Role;
    public roleToRemove: Role;
    public typeMsg: MessageType;
    public replyMsg: Message;
  }