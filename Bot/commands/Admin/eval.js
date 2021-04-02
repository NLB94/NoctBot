const { Channel } = require("discord.js");
const { MESSAGES } = require("../../../util/constants");
const fetch = require('node-fetch'); 
 
const functions = require('../../../util/functions');

module.exports.run = functions.run = async (client, message, args, settings) => {
  message.delete().catch(err => {})
  function clean(text) {
    if (typeof text === "string") 
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
  const nlb = client.users.cache.get(process.env.OWNER_ID);
  const code = args.join(" ");
  
  const evaled = await eval(code);
  const cleanCode = await clean(evaled);
  if (code.includes("token")) {
  nlb.send(cleanCode, { code: "js" });
  }
  else if (cleanCode) message.channel.send(cleanCode, { code: "js" });
};
 
module.exports.help = MESSAGES.COMMANDS.ADMIN.EVAL;